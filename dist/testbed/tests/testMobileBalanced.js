var e_depth = 4;
function TestMobileBalanced() {
  // Create ground body.
  var bodyDef = new liquidfun.b2BodyDef;
  bodyDef.position.Set(0.0, 20.0);
  var ground = world.CreateBody(bodyDef);

  var a = 0.5;
  var h = new liquidfun.b2Vec2(0.0, a);

  var root = AddNode(ground, new liquidfun.b2Vec2(0, 0), 0, 3.0, a);

  var jointDef = new liquidfun.b2RevoluteJointDef;
  jointDef.bodyA = ground;
  jointDef.bodyB = root;
  jointDef.localAnchorA = new liquidfun.b2Vec2(0, 0);
  jointDef.localAnchorB = h;
  world.CreateJoint(jointDef);
}

var AddNode = function(parent, localAnchor, depth, offset, a) {
  var density = 20.0;
  var h = new liquidfun.b2Vec2(0.0, a);

  var p = parent.GetPosition();
  liquidfun.b2Vec2.Add(p, p, localAnchor);
  liquidfun.b2Vec2.Sub(p, p, h);

  var bodyDef = new liquidfun.b2BodyDef;
  bodyDef.type = liquidfun.b2_dynamicBody;
  bodyDef.position = p;
  var body = world.CreateBody(bodyDef);

  var shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(offset, 0.25 * a, new liquidfun.b2Vec2(0, -a), 0);
  body.CreateFixtureFromShape(shape, density);

  if (depth === e_depth) {
    return body;
  }

  var a1 = new liquidfun.b2Vec2(offset, -a);
  var a2 = new liquidfun.b2Vec2(-offset, -a);
  var body1 = AddNode(body, a1, depth + 1, 0.5 * offset, a);
  var body2 = AddNode(body, a2, depth + 1, 0.5 * offset, a);

  var jointDef = new liquidfun.b2RevoluteJointDef;
  jointDef.bodyA = body;
  jointDef.localAnchorB = h;

  jointDef.localAnchorA = a1;
  jointDef.bodyB = body1;
  world.CreateJoint(jointDef);

  jointDef.localAnchorA = a2;
  jointDef.bodyB = body2;
  world.CreateJoint(jointDef);

  return body;
};