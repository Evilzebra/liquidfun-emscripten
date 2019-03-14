function TestRopeJoint() {
  var ground = new liquidfun.b2Body();
  var bd = new liquidfun.b2BodyDef();
  ground = world.CreateBody(bd);

  var shape = new liquidfun.b2EdgeShape();
  shape.Set(new liquidfun.b2Vec2(-40.0, 0.0), new liquidfun.b2Vec2(40.0, 0.0));
  ground.CreateFixtureFromShape(shape, 0.0);

  // setp up box
  shape = new liquidfun.b2PolygonShape();
  shape.SetAsBoxXY(0.5, 0.125);

  var fd = new liquidfun.b2FixtureDef();
  fd.shape = shape;
  fd.density = 20.0;
  fd.friction = 0.2;
  fd.filter.categoryBits = 0x0001;
  fd.filter.maskBits = 0xFFFF & ~0x0002;

  var jd = new liquidfun.b2RevoluteJointDef();
  jd.collideConnected = false;

  var N = 10;
  var y = 15.0;
  this.ropeDef = new liquidfun.b2RopeJointDef();
  this.ropeDef.localAnchorA.Set(0.0, y);

  var prevBody = ground;
  for (var i = 0; i < N; ++i) {
    var bd = new liquidfun.b2BodyDef();
    bd.type = liquidfun.b2_dynamicBody;
    bd.position.Set(0.5 + i, y);
    if (i == N - 1)
    {
      shape = new liquidfun.b2PolygonShape();
      shape.SetAsBoxXY(1.5, 1.5);
      fd.density = 100.0;
      fd.filter.categoryBits = 0x0002;
      bd.position.Set(i, y);
      bd.angularDamping = 0.4;
      fd.shape = shape;
    }

    var body = world.CreateBody(bd);

    body.CreateFixtureFromDef(fd);

    var anchor = new liquidfun.b2Vec2(i, y);
    jd.InitializeAndCreate(prevBody, body, anchor);
    prevBody = body;
  }

  this.ropeDef.localAnchorB.Set(0,0);

  var extraLength = 0.01;
  this.ropeDef.maxLength = N - 1.0 + extraLength;
  this.ropeDef.bodyB = prevBody;

  this.ropeDef.bodyA = ground;
  this.rope = world.CreateJoint(this.ropeDef);
}

TestRopeJoint.prototype.Keyboard = function(key) {
  switch (key) {
    case 'j':
      if (this.rope !== null) {
        world.DestroyJoint(this.rope);
        this.rope = null;
      }
      else {
        this.rope = world.CreateJoint(this.ropeDef);
      }
      break;
  }
}