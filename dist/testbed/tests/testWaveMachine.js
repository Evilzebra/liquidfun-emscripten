function TestWaveMachine() {
  camera.position.y = 1;
  camera.position.z = 2.5;

  var bd = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bd);

  bd.type = liquidfun.b2_dynamicBody;
  bd.allowSleep = false;
  bd.position.Set(0, 1);
  var body = world.CreateBody(bd);

  var b1 = new liquidfun.b2PolygonShape();
  b1.SetAsBoxXYCenterAngle(0.05, 1, new liquidfun.b2Vec2(2, 0), 0);
  body.CreateFixtureFromShape(b1, 5);

  var b2 = new liquidfun.b2PolygonShape();
  b2.SetAsBoxXYCenterAngle(0.05, 1, new liquidfun.b2Vec2(-2, 0), 0);
  body.CreateFixtureFromShape(b2, 5);

  var b3 = new liquidfun.b2PolygonShape();
  b3.SetAsBoxXYCenterAngle(2, 0.05, new liquidfun.b2Vec2(0, 1), 0);
  body.CreateFixtureFromShape(b3, 5);

  var b4 = new liquidfun.b2PolygonShape();
  b4.SetAsBoxXYCenterAngle(2, 0.05, new liquidfun.b2Vec2(0, -1), 0);
  body.CreateFixtureFromShape(b4, 5);

  var jd = new liquidfun.b2RevoluteJointDef();
  jd.motorSpeed = 0.05 * Math.PI;
  jd.maxMotorTorque = 1e7;
  jd.enableMotor = true;
  this.joint = jd.InitializeAndCreate(ground, body, new liquidfun.b2Vec2(0, 1));
  this.time = 0;

  // setup particles
  var psd = new liquidfun.b2ParticleSystemDef();
  psd.radius = 0.025;
  psd.dampingStrength = 0.2;

  var particleSystem = world.CreateParticleSystem(psd);
  var box = new liquidfun.b2PolygonShape();
  box.SetAsBoxXYCenterAngle(0.9, 0.9, new liquidfun.b2Vec2(0, 1.0), 0);

  var particleGroupDef = new liquidfun.b2ParticleGroupDef();
  particleGroupDef.shape = box;
  var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);
}

TestWaveMachine.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
  this.time += 1 / 60;
  this.joint.SetMotorSpeed(0.05 * Math.cos(this.time) * Math.PI);
}