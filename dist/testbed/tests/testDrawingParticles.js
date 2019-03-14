var e_parameterBegin = (1 << 31); // Start of this parameter namespace.
var e_parameterMove = e_parameterBegin | (1 << 0);
var e_parameterRigid = e_parameterBegin | (1 << 1);
var e_parameterRigidBarrier = e_parameterBegin | (1 << 2);
var e_parameterElasticBarrier = e_parameterBegin | (1 << 3);
var e_parameterSpringBarrier = e_parameterBegin | (1 << 4);
var e_parameterRepulsive = e_parameterBegin | (1 << 5);

function TestDrawingParticles() {
  camera.position.y = 2;
  camera.position.z = 3.2;
  var bd = new liquidfun.b2BodyDef;
  var ground = world.CreateBody(bd);

  var shape = new liquidfun.b2PolygonShape;
  shape.vertices.push(new liquidfun.b2Vec2(-4, -2));
  shape.vertices.push(new liquidfun.b2Vec2(4, -2));
  shape.vertices.push(new liquidfun.b2Vec2(4, 0));
  shape.vertices.push(new liquidfun.b2Vec2(-4, 0));
  ground.CreateFixtureFromShape(shape, 0.0);

  shape = new liquidfun.b2PolygonShape;
  shape.vertices.push(new liquidfun.b2Vec2(-4, -2));
  shape.vertices.push(new liquidfun.b2Vec2(-2, -2));
  shape.vertices.push(new liquidfun.b2Vec2(-2, 6));
  shape.vertices.push(new liquidfun.b2Vec2(-4, 6));
  ground.CreateFixtureFromShape(shape, 0.0);

  shape = new liquidfun.b2PolygonShape;
  shape.vertices.push(new liquidfun.b2Vec2(2, -2));
  shape.vertices.push(new liquidfun.b2Vec2(4, -2));
  shape.vertices.push(new liquidfun.b2Vec2(4, 6));
  shape.vertices.push(new liquidfun.b2Vec2(2, 6));
  ground.CreateFixtureFromShape(shape, 0.0);

  shape = new liquidfun.b2PolygonShape;
  shape.vertices.push(new liquidfun.b2Vec2(-4, 4));
  shape.vertices.push(new liquidfun.b2Vec2(4, 4));
  shape.vertices.push(new liquidfun.b2Vec2(4, 6));
  shape.vertices.push(new liquidfun.b2Vec2(-4, 6));
  ground.CreateFixtureFromShape(shape, 0.0);

  this.colorIndex = 0;
  var psd = new liquidfun.b2ParticleSystemDef();
  psd.radius = 0.05;

  this.particleSystem = world.CreateParticleSystem(psd);
  this.lastGroup = null;
  this.drawing = false;

  this.particleFlags = 0;
  this.groupFlags = 0;
}

/**@return number*/
TestDrawingParticles.prototype.DetermineParticleParameter = function() {
  if (this.drawing) {
    if (this.groupFlags === (liquidfun.b2_rigidParticleGroup |
      liquidfun.b2_solidParticleGroup)) {
      return e_parameterRigid;
    }
    if (this.groupFlags === liquidfun.b2_rigidParticleGroup &&
      this.particleFlags === liquidfun.b2_barrierParticle) {
      return e_parameterRigidBarrier;
    }
    if (this.particleFlags === (liquidfun.b2_elasticParticle | liquidfun.b2_barrierParticle)) {
      return e_parameterElasticBarrier;
    }
    if (this.particleFlags == (liquidfun.b2_springParticle | liquidfun.b2_barrierParticle)) {
      return e_parameterSpringBarrier;
    }
    if (this.particleFlags == (liquidfun.b2_wallParticle | liquidfun.b2_repulsiveParticle)) {
      return e_parameterRepulsive;
    }
    return this.particleFlags;
  }
  return e_parameterMove;
};

TestDrawingParticles.prototype.Keyboard = function(key) {
  this.drawing = key != 'X';
  this.particleFlags = 0;
  this.groupFlags = 0;
  switch (key) {
    case 'E':
      this.particleFlags = liquidfun.b2_elasticParticle;
      this.groupFlags = liquidfun.b2_solidParticleGroup;
      break;
    case 'P':
      this.particleFlags = liquidfun.b2_powderParticle;
      break;
    case 'R':
      this.groupFlags = liquidfun.b2_rigidParticleGroup | liquidfun.b2_solidParticleGroup;
      break;
    case 'S':
      this.particleFlags = liquidfun.b2_springParticle;
      this.groupFlags = liquidfun.b2_solidParticleGroup;
      break;
    case 'T':
      this.particleFlags = liquidfun.b2_tensileParticle;
      break;
    case 'V':
      this.particleFlags = liquidfun.b2_viscousParticle;
      break;
    case 'W':
      this.particleFlags = liquidfun.b2_wallParticle;
      this.groupFlags = liquidfun.b2_solidParticleGroup;
      break;
    case 'B':
      this.particleFlags = liquidfun.b2_barrierParticle | liquidfun.b2_wallParticle;
      break;
    case 'H':
      this.particleFlags = liquidfun.b2_barrierParticle;
      this.groupFlags = liquidfun.b2_rigidParticleGroup;
      break;
    case 'N':
      this.particleFlags = liquidfun.b2_barrierParticle | liquidfun.b2_elasticParticle;
      this.groupFlags = liquidfun.b2_solidParticleGroup;
      break;
    case 'M':
      this.particleFlags = liquidfun.b2_barrierParticle | liquidfun.b2_springParticle;
      this.groupFlags = liquidfun.b2_solidParticleGroup;
      break;
    case 'F':
      this.particleFlags = liquidfun.b2_wallParticle | liquidfun.b2_repulsiveParticle;
      break;
    case 'C':
      this.particleFlags = liquidfun.b2_colorMixingParticle;
      break;
    case 'Z':
      this.particleFlags = liquidfun.b2_zombieParticle;
      break;
    default:
      break;
  }
};

TestDrawingParticles.prototype.MouseDown = function(p) {
  this.drawing = true;
};

TestDrawingParticles.prototype.MouseMove = function(p) {
  if (this.drawing) {
    var shape = new liquidfun.b2CircleShape;
    shape.position = p;
    shape.radius = 0.2;
    var xf = new liquidfun.b2Transform;
    xf.SetIdentity();

    this.particleSystem.DestroyParticlesInShape(shape, xf);

    var joinGroup =
      this.lastGroup && this.groupFlags === this.lastGroup.GetGroupFlags();
    if (!joinGroup) {
      this.colorIndex = (this.colorIndex + 1) % particleColors.length;
    }
    var pd = new liquidfun.b2ParticleGroupDef;
    pd.shape = shape;
    pd.flags = this.particleFlags;
    if ((this.particleFlags &
      (liquidfun.b2_wallParticle | liquidfun.b2_springParticle | liquidfun.b2_elasticParticle)) ||
      (this.particleFlags === (liquidfun.b2_wallParticle | liquidfun.b2_barrierParticle))) {
      pd.flags |= liquidfun.b2_reactiveParticle;
    }
    pd.groupFlags = this.groupFlags;
    pd.color = particleColors[this.colorIndex];
    if (this.lastGroup !== null) {
      pd.group = this.lastGroup;
    }
    this.lastGroup = this.particleSystem.CreateParticleGroup(pd);
    this.mouseTracing = false;
  }
};

TestDrawingParticles.prototype.MouseUp = function(p) {
  this.drawing = false;
  this.lastGroup = null;
};

TestDrawingParticles.prototype.ParticleGroupDestroyed = function(group) {
  if (group === this.lastGroup) {
    this.lastGroup = null;
  }
};
