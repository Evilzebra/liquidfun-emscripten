function TestChain() {
  var bodyDef = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bodyDef);

  var edge = new liquidfun.b2EdgeShape();
  edge.Set(new liquidfun.b2Vec2(-40, 0), new liquidfun.b2Vec2(40, 0));
  ground.CreateFixtureFromShape(edge, 0);

  var y = 25;
  var prevBody = ground;
  for (var i = 0; i < 30; i++) {
    var jd = new liquidfun.b2RevoluteJointDef();
    jd.collideConnected = false;
    var box = new liquidfun.b2PolygonShape();
    box.SetAsBoxXY(0.6, 0.125);
    var fixtureDef = new liquidfun.b2FixtureDef();
    fixtureDef.shape = box;
    fixtureDef.density = 20;
    fixtureDef.friction = 0.2;
    bodyDef.type = liquidfun.b2_dynamicBody;
    bodyDef.position.Set(0.5 + i, y);
    var body = world.CreateBody(bodyDef);
    body.CreateFixtureFromDef(fixtureDef);

    var anchor = new liquidfun.b2Vec2(i, y);
    jd.InitializeAndCreate(prevBody, body, anchor);
    prevBody = body;
  }
}