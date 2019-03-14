function TestSensorTest() {
  this.touching = [];
  this.bodies = [];
  this.count = 7;

  // setup ground
  var bd = new liquidfun.b2BodyDef;
  var ground = world.CreateBody(bd);

  var shape = new liquidfun.b2EdgeShape;
  shape.Set(new liquidfun.b2Vec2(-40.0, 0.0), new liquidfun.b2Vec2(40.0, 0.0));
  ground.CreateFixtureFromShape(shape, 0.0);

  /*
  var sd = new liquidfun.b2FixtureDef;
  sd.SetAsBoxXYCenterAngle(10.0, 2.0, new liquidfun.b2Vec2(0.0, 20.0), 0.0);
  sd.isSensor = true;
  this.sensor = ground.CreateFixture(sd);*/

  // create sensor
  shape = new liquidfun.b2CircleShape;
  shape.radius = 5.0;
  shape.position.Set(0.0, 10.0);

  var fd = new liquidfun.b2FixtureDef;
  fd.shape = shape;
  fd.isSensor = true;
  this.sensor = ground.CreateFixtureFromDef(fd);
  this.sensor.detail = "sensor";

  // create shapes
  for (var i = 0; i < this.count; ++i) {
    shape = new liquidfun.b2CircleShape;
    shape.radius = 1;

    bd = new liquidfun.b2BodyDef;
    bd.type = liquidfun.b2_dynamicBody;
    bd.position.Set(-10.0 + 3.0 * i, 20.0);
    bd.userData = i;

    this.touching.push(false);
    this.bodies.push(world.CreateBody(bd));

    this.bodies[i].CreateFixtureFromShape(shape, 1.0);
    this.bodies[i].fixtures[0].detail = i;
  }
  world.SetContactListener(this);
}

TestSensorTest.prototype.BeginContactBody = function(contact) {
  var fixtureA = contact.GetFixtureA();
  var fixtureB = contact.GetFixtureB();

  if (fixtureA === this.sensor) {
    var userData = fixtureB.body.GetUserData();
    if (userData) {
      this.touching[userData] = true;
    }
  }
  if (fixtureB === this.sensor) {
    var userData = fixtureB.body.GetUserData();
    if (userData) {
      this.touching[userData] = true;
    }
  }
};

TestSensorTest.prototype.EndContactBody = function(contact) {
  var fixtureA = contact.GetFixtureA();
  var fixtureB = contact.GetFixtureB();

  if (fixtureA === this.sensor) {
    var userData = fixtureB.body.GetUserData();
    if (userData) {
      this.touching[userData] = false;
    }
  }
  if (fixtureB === this.sensor) {
    var userData = fixtureB.body.GetUserData();
    if (userData) {
      this.touching[userData] = false;
    }
  }
};

TestSensorTest.prototype.Step =function() {
  for (var i = 0; i < this.count; i++) {
    if (this.touching[i] === false) {
      continue;
    }
    var body = this.bodies[i];
    var ground = this.sensor.body;

    var circle = this.sensor.shape;
    var center = ground.GetWorldPoint(circle.position);

    var position = body.GetPosition();
    var d = new liquidfun.b2Vec2();

    liquidfun.b2Vec2.Sub(d, center, position);

    if (d.LengthSquared() < FLT_EPSILON * FLT_EPSILON) {
      continue;
    }
    liquidfun.b2Vec2.Normalize(d, d);
    liquidfun.b2Vec2.MulScalar(d, d, 100);
    body.ApplyForce(d, position, false);
  }
  Step();
};