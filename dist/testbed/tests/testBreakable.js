function TestBreakable() {
  var count = 7;
  var bd = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bd);

  var edge = new liquidfun.b2EdgeShape();
  edge.Set(new liquidfun.b2Vec2(-40, 0), new liquidfun.b2Vec2(40, 0));
  ground.CreateFixtureFromShape(edge, 0);

  //breakable dynamic body
  bd = new liquidfun.b2BodyDef();
  bd.type = liquidfun.b2_dynamicBody;
  bd.position.Set(0, 40);
  bd.angle = 0.25 * Math.PI;

  this.body1 = world.CreateBody(bd);
  this.shape1 = new liquidfun.b2PolygonShape();
  this.shape1.SetAsBoxXYCenterAngle(0.5, 0.5, new liquidfun.b2Vec2(-0.5, 0), 0);
  this.piece1 = this.body1.CreateFixtureFromShape(this.shape1, 1);

  this.shape2 = new liquidfun.b2PolygonShape();
  this.shape2.SetAsBoxXYCenterAngle(0.5, 0.5, new liquidfun.b2Vec2(0.5, 0), 0);
  this.piece2 = this.body1.CreateFixtureFromShape(this.shape2, 1);

  this.break = false;
  this.broke = false;

  world.SetContactListener(this);
}

TestBreakable.prototype.PostSolve = function(contact, impulse) {
  if (this.broke) {
    return;
  }

  var count = contact.GetManifold().GetPointCount();

  var maxImpulse = 0;
  for (var i = 0; i < count; i++) {
    maxImpulse = Math.max(maxImpulse, impulse.GetNormalImpulse(i));
  }

  if (maxImpulse > 40) {
    this.break = true;
  }
}

TestBreakable.prototype.Break = function() {
  var body1 = this.piece1.body;
  var center = body1.GetWorldCenter();

  body1.DestroyFixture(this.piece2);
  // This line is JUST for Three.js
  scene.remove(this.piece2.graphic);

  var bd = new liquidfun.b2BodyDef();
  bd.type = liquidfun.b2_dynamicBody;
  bd.position = this.body1.GetPosition();
  bd.angle = this.body1.GetAngle();

  var body2 = world.CreateBody(bd);
  this.piece2 = body2.CreateFixtureFromShape(this.shape2, 1);

  var center1 = body1.GetWorldCenter();
  var center2 = body2.GetWorldCenter();

  liquidfun.b2Vec2.Sub(center1, center1, center);
  liquidfun.b2Vec2.Sub(center2, center2, center);

  var velocity1 = new liquidfun.b2Vec2();
  var velocity2 = new liquidfun.b2Vec2();
  liquidfun.b2Vec2.CrossScalar(velocity1, center1, this.angularVelocity);
  liquidfun.b2Vec2.CrossScalar(velocity2, center2, this.angularVelocity);

  liquidfun.b2Vec2.Add(velocity1, velocity1, this.velocity);
  liquidfun.b2Vec2.Add(velocity2, velocity2, this.velocity);

  body1.SetAngularVelocity(this.angularVelocity);
  body1.SetLinearVelocity(velocity1);

  body2.SetAngularVelocity(this.angularVelocity);
  body2.SetLinearVelocity(velocity2);
}

TestBreakable.prototype.Step = function() {
  if (this.break) {
    this.Break();
    this.broke = true;
    this.break = false;
  }

  if (this.broke === false) {
    this.velocity = this.body1.GetLinearVelocity();
    this.angularVelocity = this.body1.GetAngularVelocity();
  }
  Step();
}