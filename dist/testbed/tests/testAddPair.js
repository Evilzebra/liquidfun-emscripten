function TestAddPair() {
  var gravity = new liquidfun.b2Vec2(0, 0);
  world.SetGravity(gravity);

  var minX = -6.0;
  var maxX = 0.0;
  var minY = 4.0;
  var maxY = 6.0;

  var bodyDef = new liquidfun.b2BodyDef();
  bodyDef.type = liquidfun.b2_dynamicBody;

  for (var x = -10; x < 10; x++) {
    for (var y = -10; y < 10; y++) {
      var circle = new liquidfun.b2CircleShape();
      circle.position.Set(0, 0);
      circle.radius = 0.1;
      var px = RandomFloat(minX, maxX);
      var py = RandomFloat(minY, maxY);
      bodyDef.position.Set(px, py);
      var body = world.CreateBody(bodyDef);
      body.CreateFixtureFromShape(circle, 0.01);
    }
  }

  var box = new liquidfun.b2PolygonShape();
  box.SetAsBoxXY(1.5, 1.5);
  bodyDef.position.Set(-40, 5);
  bodyDef.bullet = true;
  body = world.CreateBody(bodyDef);
  body.CreateFixtureFromShape(box, 1.0);
  var velocity = new liquidfun.b2Vec2(150, 0);
  body.SetLinearVelocity(velocity);
}