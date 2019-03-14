function TestPyramid() {
  var bodyDef = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bodyDef);

  var edgeShape = new liquidfun.b2EdgeShape();
  edgeShape.Set(new liquidfun.b2Vec2(-40, 0), new liquidfun.b2Vec2(40, 0));
  ground.CreateFixtureFromShape(edgeShape, 0);

  var x = new liquidfun.b2Vec2(-7, 0.75);
  var y = new liquidfun.b2Vec2();
  var dx = new liquidfun.b2Vec2(0.5625, 1.25);
  var dy = new liquidfun.b2Vec2(1.125, 0);

  for (var i = 0; i < 20; i++) {
    y = new liquidfun.b2Vec2(x.x, x.y);
    for (var j = i; j < 20; j++) {
      var bodyDef = new liquidfun.b2BodyDef();
      bodyDef.type = liquidfun.b2_dynamicBody;
      bodyDef.position = y;
      var box = new liquidfun.b2PolygonShape();
      box.SetAsBoxXY(0.5, 0.5);
      bodyDef.shape = box;

      var body = world.CreateBody(bodyDef);
      body.CreateFixtureFromShape(box, 5);
      liquidfun.b2Vec2.Add(y, y, dy);
    }
    liquidfun.b2Vec2.Add(x, x, dx);
  }
}