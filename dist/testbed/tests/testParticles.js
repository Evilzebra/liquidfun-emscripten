function TestParticles() {
  camera.position.y = 4;
  camera.position.z = 8;
  var bd = new liquidfun.b2BodyDef();
  var ground = world.CreateBody(bd);

  var shape1 = new liquidfun.b2PolygonShape();
  var vertices = shape1.vertices;
  vertices.push(new liquidfun.b2Vec2(-4, -1));
  vertices.push(new liquidfun.b2Vec2(4, -1));
  vertices.push(new liquidfun.b2Vec2(4, 0));
  vertices.push(new liquidfun.b2Vec2(-4, 0));
  ground.CreateFixtureFromShape(shape1, 0);

  var shape2 = new liquidfun.b2PolygonShape();
  var vertices = shape2.vertices;
  vertices.push(new liquidfun.b2Vec2(-4, -0.1));
  vertices.push(new liquidfun.b2Vec2(-2, -0.1));
  vertices.push(new liquidfun.b2Vec2(-2, 2));
  vertices.push(new liquidfun.b2Vec2(-4, 3));
  ground.CreateFixtureFromShape(shape2, 0);

  var shape3 = new liquidfun.b2PolygonShape();
  var vertices = shape3.vertices;
  vertices.push(new liquidfun.b2Vec2(2, -0.1));
  vertices.push(new liquidfun.b2Vec2(4, -0.1));
  vertices.push(new liquidfun.b2Vec2(4, 3));
  vertices.push(new liquidfun.b2Vec2(2, 2));
  ground.CreateFixtureFromShape(shape3, 0);


  var psd = new liquidfun.b2ParticleSystemDef();
  psd.radius = 0.035;
  var particleSystem = world.CreateParticleSystem(psd);

  // one group
  var circle = new liquidfun.b2CircleShape();
  circle.position.Set(0, 3);
  circle.radius = 2;
  var pgd = new liquidfun.b2ParticleGroupDef();
  pgd.shape = circle;
  pgd.color.Set(255, 0, 0, 255);
  particleSystem.CreateParticleGroup(pgd);

  // circle
  bd = new liquidfun.b2BodyDef()
  var circle = new liquidfun.b2CircleShape();
  bd.type = liquidfun.b2_dynamicBody;
  var body = world.CreateBody(bd);
  circle.position.Set(0, 8);
  circle.radius = 0.5;
  body.CreateFixtureFromShape(circle, 0.5);
}