// This test is buggy :( todo debug the particle issues
function TestRigidParticles() {
  camera.position.y = 3;
  camera.position.z = 6;

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
  vertices.push(new liquidfun.b2Vec2(-4, 2));
  ground.CreateFixtureFromShape(shape2, 0);

  var shape3 = new liquidfun.b2PolygonShape();
  var vertices = shape3.vertices;
  vertices.push(new liquidfun.b2Vec2(2, -0.1));
  vertices.push(new liquidfun.b2Vec2(4, -0.1));
  vertices.push(new liquidfun.b2Vec2(4, 2));
  vertices.push(new liquidfun.b2Vec2(2, 2));
  ground.CreateFixtureFromShape(shape3, 0);

  var psd = new liquidfun.b2ParticleSystemDef();
  psd.radius = 0.035;
  var particleSystem = world.CreateParticleSystem(psd);

  // one group
  var circle = new liquidfun.b2CircleShape();
  circle.position.Set(0, 3);
  circle.radius = 0.5;
  var pgd = new liquidfun.b2ParticleGroupDef();
  pgd.groupFlags = liquidfun.b2_rigidParticleGroup | liquidfun.b2_solidParticleGroup;;
  pgd.shape = circle;
  pgd.color.Set(255, 0, 0, 255);
  particleSystem.CreateParticleGroup(pgd);

  // two group
  circle = new liquidfun.b2CircleShape();
  circle.position.Set(-1, 3);
  circle.radius = 0.5;
  pgd = new liquidfun.b2ParticleGroupDef();
  pgd.groupFlags = liquidfun.b2_rigidParticleGroup | liquidfun.b2_solidParticleGroup;;
  pgd.shape = circle;
  pgd.color.Set(0, 255, 0, 255);
  particleSystem.CreateParticleGroup(pgd);

  // third group
  var box = new liquidfun.b2PolygonShape();
  var pgd = new liquidfun.b2ParticleGroupDef();
  box.SetAsBoxXY(1, 0.5);
  pgd.groupFlags = liquidfun.b2_rigidParticleGroup | liquidfun.b2_solidParticleGroup;;
  pgd.position.Set(1, 4);
  pgd.angle = -0.5;
  pgd.angularVelocity = 2;
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
}