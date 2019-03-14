function TestRevolute() {
  var bd = new liquidfun.b2BodyDef;
  var ground = world.CreateBody(bd);

  var shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-40.0, 0.0), new liquidfun.b2Vec2(40.0, 0.0));

  var fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  //fd.filter.categoryBits = 2;

  ground.CreateFixtureFromDef(fd);

  shape = new liquidfun.b2CircleShape;
  shape.radius = 0.5;

  bd = new liquidfun.b2BodyDef;
  bd.type = liquidfun.b2_dynamicBody;

  var rjd = new liquidfun.b2RevoluteJointDef;

  bd.position.Set(-10.0, 20.0);
  var body = world.CreateBody(bd);
  body.CreateFixtureFromShape(shape, 5.0);

  var w = 100.0;
  body.SetAngularVelocity(w);
  body.SetLinearVelocity(new liquidfun.b2Vec2(-8.0 * w, 0.0));

  rjd.motorSpeed = Math.PI;
  rjd.maxMotorTorque = 10000.0;
  rjd.enableMotor = false;
  rjd.lowerAngle = -0.25 * Math.PI;
  rjd.upperAngle = 0.5 * Math.PI;
  rjd.enableLimit = true;
  rjd.collideConnected = true;
  this.joint = rjd.InitializeAndCreate(ground, body, new liquidfun.b2Vec2(-10.0, 12.0));


  var circle_shape = new liquidfun.b2CircleShape;
  circle_shape.radius = 3.0;

  var circle_bd = new liquidfun.b2BodyDef;
  circle_bd.type = liquidfun.b2_dynamicBody;
  circle_bd.position.Set(5.0, 30.0);

  fd = new liquidfun.b2FixtureDef;
  fd.density = 5.0;
  fd.filter.maskBits = 1;
  fd.shape = circle_shape;

  this.ball = world.CreateBody(circle_bd);
  this.ball.CreateFixtureFromDef(fd);

  var polygon_shape = new liquidfun.b2PolygonShape;
  polygon_shape.SetAsBoxXYCenterAngle(10.0, 0.2, new liquidfun.b2Vec2 (-10.0, 0.0), 0.0);

  var polygon_bd = new liquidfun.b2BodyDef;
  polygon_bd.position.Set(20.0, 10.0);
  polygon_bd.type = liquidfun.b2_dynamicBody;
  polygon_bd.bullet = true;
  var polygon_body = world.CreateBody(polygon_bd);
  polygon_body.CreateFixtureFromShape(polygon_shape, 2.0);

  rjd = new liquidfun.b2RevoluteJointDef;
  rjd.lowerAngle = -0.25 * Math.PI;
  rjd.upperAngle = 0.0;
  rjd.enableLimit = true;
  rjd.InitializeAndCreate(ground, polygon_body, new liquidfun.b2Vec2(20.0, 10.0));

  // Tests mass computation of a small object far from the origin
  var bodyDef = new liquidfun.b2BodyDef;
  bodyDef.type = liquidfun.b2_dynamicBody;
  body = world.CreateBody(bodyDef);

  var polyShape = new liquidfun.b2PolygonShape;
  polyShape.vertices[0] = new liquidfun.b2Vec2( 17.63, 36.31 );
  polyShape.vertices[1] = new liquidfun.b2Vec2( 17.52, 36.69 );
  polyShape.vertices[2] = new liquidfun.b2Vec2( 17.19, 36.36 );

  var polyFixtureDef = new liquidfun.b2FixtureDef;
  polyFixtureDef.shape = polyShape;
  polyFixtureDef.density = 1;

  body.CreateFixtureFromDef(polyFixtureDef);	//assertion hits inside here
}

TestRevolute.prototype.Keyboard = function(key) {
  switch (key) {
    case 'l':
      this.joint.EnableLimit(!this.joint.IsLimitEnabled());
      break;
    case 'm':
      this.joint.EnableMotor(!this.joint.IsMotorEnabled());
      break;
  }
};