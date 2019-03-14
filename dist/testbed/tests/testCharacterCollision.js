function TestCharacterCollision() {
  // Ground body
  var bd = new liquidfun.b2BodyDef;
  var ground = world.CreateBody(bd);

  var shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-20.0, 0.0), new liquidfun.b2Vec2(20.0, 0.0));
  ground.CreateFixtureFromShape(shape, 0.0);

  // Collinear edges with no adjacency information.
  // This shows the problematic case where a box shape can hit
  // an internal vertex.
  bd = new liquidfun.b2BodyDef;
  ground = world.CreateBody(bd);

  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-8.0, 1.0), new liquidfun.b2Vec2(-6.0, 1.0));
  ground.CreateFixtureFromShape(shape, 0.0);

  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-6.0, 1.0), new liquidfun.b2Vec2(-4.0, 1.0));
  ground.CreateFixtureFromShape(shape, 0.0);

  shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-4.0, 1.0), new liquidfun.b2Vec2(-2.0, 1.0));
  ground.CreateFixtureFromShape(shape, 0.0);

  // Chain shape
  bd = new liquidfun.b2BodyDef;
  bd.angle = 0.25 * Math.PI;
  ground = world.CreateBody(bd);

  shape = new liquidfun.b2ChainShape;
  shape.vertices[0] = new liquidfun.b2Vec2(5.0, 7.0);
  shape.vertices[1] = new liquidfun.b2Vec2(6.0, 8.0);
  shape.vertices[2] = new liquidfun.b2Vec2(7.0, 8.0);
  shape.vertices[3] = new liquidfun.b2Vec2(8.0, 7.0);
  ground.CreateFixtureFromShape(shape, 0.0);

  // Square tiles. This shows that adjacency shapes may
  // have non-smooth collision. There is no solution
  // to this problem.
  bd = new liquidfun.b2BodyDef;
  ground = world.CreateBody(bd);

  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(1.0, 1.0, new liquidfun.b2Vec2(4.0, 3.0), 0.0);
  ground.CreateFixtureFromShape(shape, 0.0);

  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(1.0, 1.0, new liquidfun.b2Vec2(6.0, 3.0), 0.0);
  ground.CreateFixtureFromShape(shape, 0.0);

  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(1.0, 1.0, new liquidfun.b2Vec2(8.0, 3.0), 0.0);
  ground.CreateFixtureFromShape(shape, 0.0);

  // Square made from an edge loop. Collision should be smooth.
  bd = new liquidfun.b2BodyDef;
  ground = world.CreateBody(bd);

  shape = new liquidfun.b2ChainShape;
  shape.vertices.push(new liquidfun.b2Vec2(-1, 3));
  shape.vertices.push(new liquidfun.b2Vec2(1.0, 3.0));
  shape.vertices.push(new liquidfun.b2Vec2(1.0, 5.0));
  shape.vertices.push(new liquidfun.b2Vec2(-1.0, 5.0));
  shape.CreateLoop();
  ground.CreateFixtureFromShape(shape, 0.0);

  // Edge loop. Collision should be smooth.
  bd = new liquidfun.b2BodyDef;
  bd.position.Set(-10.0, 4.0);
  ground = world.CreateBody(bd);

  shape = new liquidfun.b2ChainShape;

  shape.vertices.push(new liquidfun.b2Vec2(0.0, 0.0));
  shape.vertices.push(new liquidfun.b2Vec2(6.0, 0.0));
  shape.vertices.push(new liquidfun.b2Vec2(6.0, 2.0));
  shape.vertices.push(new liquidfun.b2Vec2(4.0, 1.0));
  shape.vertices.push(new liquidfun.b2Vec2(2.0, 2.0));
  shape.vertices.push(new liquidfun.b2Vec2(0.0, 2.0));
  shape.vertices.push(new liquidfun.b2Vec2(-2.0, 2.0));
  shape.vertices.push(new liquidfun.b2Vec2(-4.0, 3.0));
  shape.vertices.push(new liquidfun.b2Vec2(-6.0, 2.0));
  shape.vertices.push(new liquidfun.b2Vec2(-6.0, 0.0));
  shape.CreateLoop();
  ground.CreateFixtureFromShape(shape, 0.0);

  // Square character 1
  bd = new liquidfun.b2BodyDef;
  bd.position.Set(-3.0, 8.0);
  bd.type = liquidfun.b2_dynamicBody;
  bd.fixedRotation = true;
  bd.allowSleep = false;

  var body = world.CreateBody(bd);

  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXY(0.5, 0.5);

  var fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.density = 20.0;
  body.CreateFixtureFromDef(fd);

  // Square character 2
  bd = new liquidfun.b2BodyDef;
  bd.position.Set(-5.0, 5.0);
  bd.type = liquidfun.b2_dynamicBody;
  bd.fixedRotation = true;
  bd.allowSleep = false;

  body = world.CreateBody(bd);

  shape = new liquidfun.b2PolygonShape;
  shape.SetAsBoxXY(0.25, 0.25);

  fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.density = 20.0;
  body.CreateFixtureFromDef(fd);

  // Hexagon character
  bd = new liquidfun.b2BodyDef;
  bd.position.Set(-5.0, 8.0);
  bd.type = liquidfun.b2_dynamicBody;
  bd.fixedRotation = true;
  bd.allowSleep = false;

  body = world.CreateBody(bd);

  var angle = 0.0;
  var delta = Math.PI / 3.0;
  shape = new liquidfun.b2PolygonShape;
  for (var i = 0; i < 6; ++i) {
    shape.vertices.push(new liquidfun.b2Vec2(0.5 * Math.cos(angle), 0.5 * Math.sin(angle)));
    angle += delta;
  }

  fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.density = 20.0;
  body.CreateFixtureFromDef(fd);

  // Circle character
  bd = new liquidfun.b2BodyDef;
  bd.position.Set(3.0, 5.0);
  bd.type = liquidfun.b2_dynamicBody;
  bd.fixedRotation = true;
  bd.allowSleep = false;

  body = world.CreateBody(bd);

  shape = new liquidfun.b2CircleShape;
  shape.radius = 0.5;

  fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.density = 20.0;
  body.CreateFixtureFromDef(fd);

  // Circle character
  bd = new liquidfun.b2BodyDef;
  bd.position.Set(-7.0, 6.0);
  bd.type = liquidfun.b2_dynamicBody;
  bd.allowSleep = false;

  this.character = world.CreateBody(bd);

  shape = new liquidfun.b2CircleShape;
  shape.radius = 0.25;

  fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.density = 20.0;
  fd.friction = 1.0;
  this.character.CreateFixtureFromDef(fd);
}

TestCharacterCollision.prototype.Step = function() {
  var v= this.character.GetLinearVelocity();
  v.x = -5;
  this.character.SetLinearVelocity(v);
  Step();
};
