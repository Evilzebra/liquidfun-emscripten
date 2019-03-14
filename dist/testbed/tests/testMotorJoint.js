function TestMotorJoint() {
  var bd = new liquidfun.b2BodyDef;
  var ground = world.CreateBody(bd);

  var shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-20.0, 0.0), new liquidfun.b2Vec2(20.0, 0.0));

  var fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;

  ground.CreateFixtureFromDef(fd);

  // Define motorized body
  bd = new liquidfun.b2BodyDef;
  bd.type = liquidfun.b2_dynamicBody;
  bd.position.Set(0.0, 8.0);
  var body = world.CreateBody(bd);

  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXY(2.0, 0.5);

  fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.friction = 0.6;
  fd.density = 2.0;
  body.CreateFixtureFromDef(fd);

  var mjd = new liquidfun.b2MotorJointDef;
  mjd.maxForce = 1000.0;
  mjd.maxTorque = 1000.0;
  this.joint = mjd.InitializeAndCreate(ground, body);
  this.go = false;
  this.time = 0.0;
}

TestMotorJoint.prototype.Keyboard = function(key) {
  if (key === 's') {
    this.go = !this.go;
  }
};

TestMotorJoint.prototype.Step = function() {
  if (this.go) {
    this.time += 1 / 60;
  }

  var linearOffset = new liquidfun.b2Vec2;
  linearOffset.x = 6 * Math.sin(2 * this.time);
  linearOffset.y = 8 + 4 * Math.sin(this.time);

  var angularOffset = 4 * this.time;

  this.joint.SetLinearOffset(linearOffset);
  this.joint.SetAngularOffset(angularOffset);

  Step();
};