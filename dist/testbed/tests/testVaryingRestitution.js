function TestVaryingRestitution() {
  var bd = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bd);

  var edge = new liquidfun.b2EdgeShape();
  edge.Set(new liquidfun.b2Vec2(-40, 0), new liquidfun.b2Vec2(40, 0));
  ground.CreateFixtureFromShape(edge, 0);

  var circle = new liquidfun.b2CircleShape();
  circle.radius = 1.0;

  var fd = new liquidfun.b2FixtureDef();
  fd.shape = circle;
  fd.density = 1;

  var restitution = [ 0, 0.1, 0.3, 0.5, 0.75, 0.9, 1];

  for (var i = 0; i < 7; i++) {
    bd.type = liquidfun.b2_dynamicBody;
    bd.position.Set(-10 + 3 * i, 20);
    var body = world.CreateBody(bd);
    fd.restitution = restitution[i];
    body.CreateFixtureFromDef(fd);
  }
}