const { src, dest, series } = require('gulp');
let replace = require('gulp-replace');
let concat  = require('gulp-concat');
let clean   = require('gulp-clean');
let find    = require('gulp-find');

function getAllb2Functions() {
    // get all js bindings to b2 functions
    return src('src/jsBindings/**/*.js')
        // join them together in a temporary file
        .pipe( concat('jsFunctionBindings.js') )
        // find all functions starting with "b2"
        .pipe( find( /function b2([A-Za-z0-9]*)/g ) )
        // format string to add functions to exports
        .pipe( replace( /function ([A-Za-z0-9]*)/g, "Module['$1']=$1") )
        .pipe( dest('.') )
}

function getAllb2Variables() {
    // get all js bindings to b2 functions
    return src('src/jsBindings/**/*.js')
        // join them together in a temporary file
        .pipe( concat('jsVarBindings.js') )
        // find all functions starting with "b2"
        .pipe( find( /var b2_([A-Za-z0-9]*)/g ) )
        // format string to add functions to exports
        .pipe( replace( /var ([A-Za-z0-9_]*)/g, "Module['$1']=$1") )
        // end line
        .pipe( replace( /$(?![\r\n])/gm, ";" ) )
        .pipe( dest('.') )
}

function wrapLiquidfunFunctions() {
    return src(['src/liquidfun.js', 'jsVarBindings.js', 'jsFunctionBindings.js'])
        // append bindings to end of liquidfun.js
        .pipe( concat('liquidfun.js') )
        // update window property to make more sense
        .pipe( replace( /window\["Module"]/, 'window["liquidfun"]' ) )
        // add function wrapper to beginning of file
        .pipe( replace( /^(.)/, "(function(){$1" ) )
        // close function wrapper at end of file
        .pipe( replace( /$(?![\r\n])/gm, "})();" ) )
        .pipe( dest('.') )
}

function removeTempFiles() {
    return src(['jsVarBindings.js', 'jsFunctionBindings.js'], {read:false})
        .pipe( clean() )
}

exports.default = series( getAllb2Functions, getAllb2Variables, wrapLiquidfunFunctions, removeTempFiles );