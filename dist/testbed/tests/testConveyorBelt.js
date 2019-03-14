function TestConveyorBelt() {
  // Ground
  var bd = new liquidfun.b2BodyDef;
  var ground = world.CreateBody(bd);

  var shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-20.0, 0.0), new liquidfun.b2Vec2(20.0, 0.0));
  ground.CreateFixtureFromShape(shape, 0.0);


  // Platform

  bd = new liquidfun.b2BodyDef;
  bd.position.Set(-5.0, 5.0);
  var body = world.CreateBody(bd);

  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXY(10.0, 0.5);

  var fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.friction = 0.8;
  this.platform = body.CreateFixtureFromDef(fd);

  // Boxes
  for (var i = 0; i < 5; ++i) {
    bd = new liquidfun.b2BodyDef;
    bd.type = liquidfun.b2_dynamicBody;
    bd.position.Set(-10.0 + 2.0 * i, 7.0);
    body = world.CreateBody(bd);

    shape = new liquidfun.b2PolygonShape;
    shape.SetAsBoxXY(0.5, 0.5);
    body.CreateFixtureFromShape(shape, 20.0);
  }

  world.SetContactListener(this);
}

TestConveyorBelt.prototype.PreSolve = function(contact, oldManifold) {
  var fixtureA = contact.GetFixtureA();
  var fixtureB = contact.GetFixtureB();

  if (fixtureA === this.platform) {
    contact.SetTangentSpeed(5.0);
  }

  if (fixtureB == this.platform)
  {
    contact.SetTangentSpeed(-5.0);
  }
};
