function TestDamBreak() {
  camera.position.y = 2;
  camera.position.z = 3;
  var bodyDef = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bodyDef);

  var chainShape = new liquidfun.b2ChainShape();
  chainShape.vertices.push(new liquidfun.b2Vec2(-2, 0));
  chainShape.vertices.push(new liquidfun.b2Vec2(2, 0));
  chainShape.vertices.push(new liquidfun.b2Vec2(2, 4));
  chainShape.vertices.push(new liquidfun.b2Vec2(-2, 4));

  chainShape.CreateLoop();
  ground.CreateFixtureFromShape(chainShape, 0);

  var shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(0.8, 1, new liquidfun.b2Vec2(-1.2, 1.01), 0);

  var psd = new liquidfun.b2ParticleSystemDef();
  psd.radius = 0.025;
  psd.dampingStrength = 0.2;

  var particleSystem = world.CreateParticleSystem(psd);

  var pd = new liquidfun.b2ParticleGroupDef();
  pd.shape = shape;
  var group = particleSystem.CreateParticleGroup(pd);
}
