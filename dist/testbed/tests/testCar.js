function TestCar() {
  var i, y2, anchor, shape, bd, ground, hs, x, y1, dx, fd;
  this.hz = 4.0;
  this.zeta = 0.7;
  this.speed = 50.0;

  bd = new liquidfun.b2BodyDef;
  ground = world.CreateBody(bd);

  shape = new liquidfun.b2EdgeShape;

  fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.density = 0.0;
  fd.friction = 0.6;

  shape.Set(new liquidfun.b2Vec2(-20.0, 0.0), new liquidfun.b2Vec2(20.0, 0.0));
  ground.CreateFixtureFromDef(fd);

  hs = [0.25, 1.0, 4.0, 0.0, 0.0, -1.0, -2.0, -2.0, -1.25, 0.0];

  x = 20.0;
  y1 = 0.0;
  dx = 5.0;

  for (i = 0; i < 10; ++i) {
    y2 = hs[i];
    shape = new liquidfun.b2EdgeShape;
    shape.Set(new liquidfun.b2Vec2(x, y1), new liquidfun.b2Vec2(x + dx, y2));
    fd.shape = shape;
    ground.CreateFixtureFromDef(fd);
    y1 = y2;
    x += dx;
  }

  for (i = 0; i < 10; ++i) {
    y2 = hs[i];
    shape = new liquidfun.b2EdgeShape;
    shape.Set(new liquidfun.b2Vec2(x, y1), new liquidfun.b2Vec2(x + dx, y2));
    fd.shape = shape;
    ground.CreateFixtureFromDef(fd);
    y1 = y2;
    x += dx;
  }

  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(x, 0.0), new liquidfun.b2Vec2(x + 40.0, 0.0));
  fd.shape = shape;
  ground.CreateFixtureFromDef(fd);

  shape = new liquidfun.b2EdgeShape;
  x += 80.0;
  shape.Set(new liquidfun.b2Vec2(x, 0.0), new liquidfun.b2Vec2(x + 40.0, 0.0));
  fd.shape = shape;
  ground.CreateFixtureFromDef(fd);

  shape = new liquidfun.b2EdgeShape;
  x += 40.0;
  shape.Set(new liquidfun.b2Vec2(x, 0.0), new liquidfun.b2Vec2(x + 10.0, 5.0));
  fd.shape = shape;
  ground.CreateFixtureFromDef(fd);

  shape = new liquidfun.b2EdgeShape;
  x += 20.0;
  shape.Set(new liquidfun.b2Vec2(x, 0.0), new liquidfun.b2Vec2(x + 40.0, 0.0));
  fd.shape = shape;
  ground.CreateFixtureFromDef(fd);

  shape = new liquidfun.b2EdgeShape;
  x += 40.0;
  shape.Set(new liquidfun.b2Vec2(x, 0.0), new liquidfun.b2Vec2(x, 20.0));
  fd.shape = shape;
  ground.CreateFixtureFromDef(fd);

  // teeter
  bd = new liquidfun.b2BodyDef;
  bd.position.Set(140.0, 1.0);
  bd.type = liquidfun.b2_dynamicBody;
  var body = world.CreateBody(bd);

  var box = new liquidfun.b2PolygonShape;
  box.SetAsBoxXY(10.0, 0.25);
  body.CreateFixtureFromShape(box, 1.0);

  var jd = new liquidfun.b2RevoluteJointDef;
  jd.lowerAngle = -8 * Math.PI / 180;
  jd.upperAngle = 8.0 * Math.PI / 180.0;
  jd.enableLimit = true;
  jd.InitializeAndCreate(ground, body, body.GetPosition());

  body.ApplyAngularImpulse(100.0, true);

  // Bridge
  var N = 20;
  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXY(1.0, 0.125);

  fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.density = 1.0;
  fd.friction = 0.6;

  jd = new liquidfun.b2RevoluteJointDef;

  var prevBody = ground;
  for (i = 0; i < N; ++i) {
    bd = new liquidfun.b2BodyDef;
    bd.type = liquidfun.b2_dynamicBody;
    bd.position.Set(161.0 + 2.0 * i, -0.125);
    body = world.CreateBody(bd);
    body.CreateFixtureFromDef(fd);

    anchor = new liquidfun.b2Vec2(160.0 + 2.0 * i, -0.125);
    jd.InitializeAndCreate(prevBody, body, anchor);

    prevBody = body;
  }

  anchor = new liquidfun.b2Vec2(160.0 + 2.0 * N, -0.125);
  jd.InitializeAndCreate(prevBody, ground, anchor);

// Boxes
  box = new liquidfun.b2PolygonShape;
  box.SetAsBoxXY(0.5, 0.5);

  bd = new liquidfun.b2BodyDef;
  bd.type = liquidfun.b2_dynamicBody;

  bd.position.Set(230.0, 0.5);
  body = world.CreateBody(bd);
  body.CreateFixtureFromShape(box, 0.5);

  bd.position.Set(230.0, 1.5);
  body = world.CreateBody(bd);
  body.CreateFixtureFromShape(box, 0.5);

  bd.position.Set(230.0, 2.5);
  body = world.CreateBody(bd);
  body.CreateFixtureFromShape(box, 0.5);

  bd.position.Set(230.0, 3.5);
  body = world.CreateBody(bd);
  body.CreateFixtureFromShape(box, 0.5);

  bd.position.Set(230.0, 4.5);
  body = world.CreateBody(bd);
  body.CreateFixtureFromShape(box, 0.5);
// Car
  var chassis = new liquidfun.b2PolygonShape;
  chassis.vertices[0] = new liquidfun.b2Vec2(-1.5, -0.5);
  chassis.vertices[1] = new liquidfun.b2Vec2(1.5, -0.5);
  chassis.vertices[2] = new liquidfun.b2Vec2(1.5, 0.0);
  chassis.vertices[3] = new liquidfun.b2Vec2(0.0, 0.9);
  chassis.vertices[4] = new liquidfun.b2Vec2(-1.15, 0.9);
  chassis.vertices[5] = new liquidfun.b2Vec2(-1.5, 0.2);

  var circle = new liquidfun.b2CircleShape;
  circle.radius = 0.4;

  bd = new liquidfun.b2BodyDef;
  bd.type = liquidfun.b2_dynamicBody;
  bd.position.Set(0.0, 1.0);
  this.car = world.CreateBody(bd);
  this.car.CreateFixtureFromShape(chassis, 1.0);

  fd = new liquidfun.b2FixtureDef;
  fd.shape = circle;
  fd.density = 1.0;
  fd.friction = 0.9;

  bd.position.Set(-1.0, 0.35);
  this.wheel1 = world.CreateBody(bd);
  this.wheel1.CreateFixtureFromDef(fd);

  bd.position.Set(1.0, 0.4);
  this.wheel2 = world.CreateBody(bd);
  this.wheel2.CreateFixtureFromDef(fd);

  jd = new liquidfun.b2WheelJointDef;
  var axis = new liquidfun.b2Vec2(0.0, 1.0);

  jd.motorSpeed = 0.0;
  jd.maxMotorTorque = 20.0;
  jd.enableMotor = true;
  jd.frequencyHz = this.hz;
  jd.dampingRatio = this.zeta;
  this.spring1 =
    jd.InitializeAndCreate(this.car, this.wheel1, this.wheel1.GetPosition(), axis);

  jd.motorSpeed = 0.0;
  jd.maxMotorTorque = 10.0;
  jd.enableMotor = false;
  jd.frequencyHz = this.hz;
  jd.dampingRatio = this.zeta;
  this.spring2 =
    jd.InitializeAndCreate(this.car, this.wheel2, this.wheel2.GetPosition(), axis);
}

TestCar.prototype.Keyboard = function(char) {
  switch (char) {
    case 'a':
      this.spring1.SetMotorSpeed(this.speed);
      break;
    case 's':
      this.spring1.SetMotorSpeed(0);
      break;
    case 'd':
      this.spring1.SetMotorSpeed(-this.speed);
      break;
    case 'q':
      this.hz = Math.max(0, this.hz - 1);
      this.spring1.SetSpringFrequencyHz(this.hz);
      this.spring2.SetSpringFrequencyHz(this.hz);
      break;
    case 'e':
      this.hz += 1;
      this.spring1.SetSpringFrequencyHz(this.hz);
      this.spring2.SetSpringFrequencyHz(this.hz);
      break;
  }
};

TestCar.prototype.Step = function() {
  var v = this.car.GetPosition();
  var look = new THREE.Vector3(v.x, v.y, 0);
  camera.lookAt(look);
  camera.position = new THREE.Vector3(v.x, v.y, 100);
  Step();
};