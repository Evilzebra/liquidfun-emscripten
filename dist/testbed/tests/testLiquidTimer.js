function TestLiquidTimer() {
  camera.position.y = 2;
  camera.position.z = 3;
  var bd = new liquidfun.b2BodyDef;
  var ground = world.CreateBody(bd);

  var shape = new liquidfun.b2ChainShape;
  shape.vertices.push(new liquidfun.b2Vec2(-2, 0));
  shape.vertices.push(new liquidfun.b2Vec2(2, 0));
  shape.vertices.push(new liquidfun.b2Vec2(2, 4));
  shape.vertices.push(new liquidfun.b2Vec2(-2, 4));
  shape.CreateLoop();
  ground.CreateFixtureFromShape(shape, 0.0);

  var psd = new liquidfun.b2ParticleSystemDef();
  psd.radius = 0.025;
  var particleSystem = world.CreateParticleSystem(psd);

  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(2, 0.4, new liquidfun.b2Vec2(0, 3.6), 0);
  var pd = new liquidfun.b2ParticleGroupDef;
  pd.flags = liquidfun.b2_tensileParticle | liquidfun.b2_viscousParticle;
  pd.shape = shape;
  particleSystem.CreateParticleGroup(pd);


  bd = new liquidfun.b2BodyDef;
  var body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-2, 3.2), new liquidfun.b2Vec2(-1.2, 3.2));
  body.CreateFixtureFromShape(shape, 0.1);

  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-1.1, 3.2), new liquidfun.b2Vec2(2, 3.2));
  body.CreateFixtureFromShape(shape, 0.1);

  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-1.2, 3.2), new liquidfun.b2Vec2(-1.2, 2.8));
  body.CreateFixtureFromShape(shape, 0.1);

  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-1.1, 3.2), new liquidfun.b2Vec2(-1.1, 2.8));
   body.CreateFixtureFromShape(shape, 0.1);

  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-1.6, 2.4), new liquidfun.b2Vec2(0.8, 2));
  body.CreateFixtureFromShape(shape, 0.1);

  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(1.6, 1.6), new liquidfun.b2Vec2(-0.8, 1.2));
  body.CreateFixtureFromShape(shape, 0.1);


  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-1.2, 0.8), new liquidfun.b2Vec2(-1.2, 0));
  body.CreateFixtureFromShape(shape, 0.1);

  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-0.4, 0.8), new liquidfun.b2Vec2(-0.4, 0));
  body.CreateFixtureFromShape(shape, 0.1);


  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(0.4, 0.8), new liquidfun.b2Vec2(0.4, 0));
  body.CreateFixtureFromShape(shape, 0.1);

  bd = new liquidfun.b2BodyDef;
  body = world.CreateBody(bd);
  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(1.2, 0.8), new liquidfun.b2Vec2(1.2, 0));
  body.CreateFixtureFromShape(shape, 0.1);
}