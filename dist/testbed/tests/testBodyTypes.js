function TestBodyTypes() {
  //setup ground
  var bd = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bd);

  var edge = new liquidfun.b2EdgeShape();
  edge.Set(new liquidfun.b2Vec2(-20, 0), new liquidfun.b2Vec2(20, 0));

  var fd = new liquidfun.b2FixtureDef();
  fd.shape = edge;
  ground.CreateFixtureFromDef(fd);

  //setup attachment
  bd = new liquidfun.b2BodyDef();
  bd.type = liquidfun.b2_dynamicBody;
  bd.position.Set(0, 3);
  var attachment = world.CreateBody(bd);

  var box = new liquidfun.b2PolygonShape();
  box.SetAsBoxXY(0.5, 2);
  attachment.CreateFixtureFromShape(box, 2);

  // setup platform
  bd = new liquidfun.b2BodyDef();
  bd.type = liquidfun.b2_dynamicBody;
  bd.position.Set(-4, 5);
  this.platform = world.CreateBody(bd);

  box = new liquidfun.b2PolygonShape();
  box.SetAsBoxXYCenterAngle(0.5, 4, new liquidfun.b2Vec2(4, 0), 0.5 * Math.PI);

  fd = new liquidfun.b2FixtureDef();
  fd.shape = box;
  fd.friction = 0.6;
  fd.density = 2;
  this.platform.CreateFixtureFromDef(fd);

  var rjd = new liquidfun.b2RevoluteJointDef();
  rjd.maxMotorTorque = 50;
  rjd.enableMotor = true;
  rjd.InitializeAndCreate(attachment, this.platform, new liquidfun.b2Vec2(0, 5));

  var pjd = new liquidfun.b2PrismaticJointDef();
  pjd.maxMotorForce = 1000;
  pjd.enableMotor = true;
  pjd.lowerTranslation = -10;
  pjd.upperTranslation = 10;
  pjd.enableLimit = true;
  pjd.InitializeAndCreate(ground, this.platform, new liquidfun.b2Vec2(0, 5), new liquidfun.b2Vec2(1, 0));

  this.speed = 3;

  var bd = new liquidfun.b2BodyDef();
  bd.type = liquidfun.b2_dynamicBody;
  bd.position.Set(0, 8);
  var body = world.CreateBody(bd);

  box = new liquidfun.b2PolygonShape();
  box.SetAsBoxXY(0.75, 0.75);

  var fd = new liquidfun.b2FixtureDef();
  fd.shape = box;
  fd.friction = 0.6;
  fd.density = 2;

  body.CreateFixtureFromDef(fd);
}

TestBodyTypes.prototype.Keyboard = function(key) {
  switch (key) {
    case 'd':
      this.platform.SetType(liquidfun.b2_dynamicBody);
      break;
    case 's':
      this.platform.SetType(liquidfun.b2_staticBody);
      break;
    case 'k':
      this.platform.SetType(liquidfun.b2_kinematicBody);
      this.platform.SetLinearVelocity(new liquidfun.b2Vec2(-this.speed, 0));
      this.platform.SetAngularVelocity(0);
      break;
  }
}

TestBodyTypes.prototype.Step = function() {
  Step();
  if (this.platform.GetType() == liquidfun.b2_kinematicBody) {
    var p = this.platform.GetTransform().p;
    var v = this.platform.GetLinearVelocity();

    if ((p.x < -10 && v.x < 0) ||
      (p.x > 10 && v.x > 0)) {
      v.x = -v.x;
      this.platform.SetLinearVelocity(v);
    }
  }
}