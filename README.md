# About
This is simply a repository to hold the emscripten releases of <a href="https://github.com/google/liquidfun">LiquidFun</a>.

If you want to read about liquidfun.js and how to compile it from scratch <a href="https://github.com/google/liquidfun/tree/master/liquidfun/Box2D/lfjs">view this README</a>.

# Installation
Can be installed with `npm` or `bower`.

### npm
	
    npm install liquidfun-emscripten

### bower

    bower install liquidfun-emscripten


# Usage
Using this with node is the same as any other module, the web usage is slightly different than the one provided by Google.

### Web
Add `<script>` tag to your page

    <script src="/node_modules/liquidfun/liquidfun.js"></script>

or (depending on package manager)

    <script src="/bower_components/liquidfun/liquidfun.js"></script>
    
---

Access the liquidfun variables from the `liquidfun` global.

	var circle = new liquidfun.b2CircleShape;
    
### nodejs

    var liquidfun = require('liquidfun-emscripten');
    
    var circle = new liquidfun.b2CircleShape;