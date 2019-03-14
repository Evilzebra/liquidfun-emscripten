/**
 * Created by joshualitt on 4/12/14.
 */
function TestSphereStack() {
  var bd = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bd);

  var edge = new liquidfun.b2EdgeShape();
  edge.Set(new liquidfun.b2Vec2(-40, 0), new liquidfun.b2Vec2(40, 0));
  ground.CreateFixtureFromShape(edge);
  var circle = new liquidfun.b2CircleShape();
  circle.radius = 1.0;

  for (var i = 0; i < 10; i++) {
    bd = new liquidfun.b2BodyDef();
    bd.type = liquidfun.b2_dynamicBody;
    bd.position.Set(0, 10 + 3 * i);
    var body = world.CreateBody(bd);
    body.CreateFixtureFromShape(circle, 1);
    body.SetLinearVelocity(new liquidfun.b2Vec2(0, -50));
  }
}