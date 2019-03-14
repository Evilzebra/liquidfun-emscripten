function TestSurfaceTension() {
  camera.position.y = 2;
  camera.position.z = 4;

  var bd = new liquidfun.b2BodyDef;
  var ground = world.CreateBody(bd);

  var shape = new liquidfun.b2PolygonShape();
  shape.vertices[0] = new liquidfun.b2Vec2(-4, -1);
  shape.vertices[1] = new liquidfun.b2Vec2(4, -1);
  shape.vertices[2] = new liquidfun.b2Vec2(4, 0);
  shape.vertices[3] = new liquidfun.b2Vec2(-4, 0);
  ground.CreateFixtureFromShape(shape, 0.0);

  var shape = new liquidfun.b2PolygonShape();
  shape.vertices[0] = new liquidfun.b2Vec2(-4, -0.1);
  shape.vertices[1] = new liquidfun.b2Vec2(-2, -0.1);
  shape.vertices[2] = new liquidfun.b2Vec2(-2, 2);
  shape.vertices[3] = new liquidfun.b2Vec2(-4, 2);
  ground.CreateFixtureFromShape(shape, 0.0);

  var shape = new liquidfun.b2PolygonShape();
  shape.vertices[0] = new liquidfun.b2Vec2(2, -0.1);
  shape.vertices[1] = new liquidfun.b2Vec2(4, -0.1);
  shape.vertices[2] = new liquidfun.b2Vec2(4, 2);
  shape.vertices[3] = new liquidfun.b2Vec2(2, 2);
  ground.CreateFixtureFromShape(shape, 0.0);

  var psd = new liquidfun.b2ParticleSystemDef();
  psd.radius = 0.035;
  psd.dampingStrength = 0.2;

  var particleSystem = world.CreateParticleSystem(psd);

  // one group
  var circle = new liquidfun.b2CircleShape();
  circle.position.Set(0, 2);
  circle.radius = 0.5;
  var pgd = new liquidfun.b2ParticleGroupDef();
  pgd.flags = liquidfun.b2_tensileParticle | liquidfun.b2_colorMixingParticle;
  pgd.shape = circle;
  pgd.color.Set(255, 0, 0, 255);
  particleSystem.CreateParticleGroup(pgd);

  // two group
  circle = new liquidfun.b2CircleShape();
  circle.position.Set(-1, 2);
  circle.radius = 0.5;
  pgd = new liquidfun.b2ParticleGroupDef();
  pgd.flags = liquidfun.b2_tensileParticle | liquidfun.b2_colorMixingParticle;
  pgd.shape = circle;
  pgd.color.Set(0, 255, 0, 255);
  particleSystem.CreateParticleGroup(pgd);

  // third group
  var box = new liquidfun.b2PolygonShape();
  var pgd = new liquidfun.b2ParticleGroupDef();
  box.vertices[0] = new liquidfun.b2Vec2(0, 3);
  box.vertices[1] = new liquidfun.b2Vec2(2, 3);
  box.vertices[2] = new liquidfun.b2Vec2(2, 3.5);
  box.vertices[3] = new liquidfun.b2Vec2(0, 3.5);
  pgd.flags = liquidfun.b2_tensileParticle | liquidfun.b2_colorMixingParticle;
  pgd.shape = box;
  pgd.color.Set(0, 0, 255, 255);
  particleSystem.CreateParticleGroup(pgd);


  // circle
  bd = new liquidfun.b2BodyDef()
  var circle = new liquidfun.b2CircleShape();
  bd.type = liquidfun.b2_dynamicBody;
  var body = world.CreateBody(bd);
  circle.position.Set(0, 8);
  circle.radius = 0.5;
  body.CreateFixtureFromShape(circle, 0.5);

  // testbed specific
  renderer.updateColorParticles = true;
}