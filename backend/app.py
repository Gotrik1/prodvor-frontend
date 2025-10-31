
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.sql import func
from dotenv import load_dotenv
from flask_migrate import Migrate

load_dotenv()

app = Flask(__name__)
# Explicitly configure CORS to handle preflight OPTIONS requests for POST
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})


# Configure the database connection using the DATABASE_URL from .env
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Add engine options to handle connection pooling and prevent timeout errors
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_pre_ping': True,
    'pool_recycle': 300, # Recycle connections every 5 minutes
}


db = SQLAlchemy(app)
migrate = Migrate(app, db)

# --- Association Tables ---

TeamMembers = db.Table('team_members',
    db.Column('userId', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('teamId', db.Integer, db.ForeignKey('team.id'), primary_key=True)
)

TeamFollowers = db.Table('team_followers',
    db.Column('userId', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('teamId', db.Integer, db.ForeignKey('team.id'), primary_key=True)
)

# --- Models ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    avatarUrl = db.Column(db.String(200))
    role = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(100))
    elo = db.Column(db.Integer, default=1200)

    # Relationships
    player_profile = db.relationship('PlayerProfile', backref='user', uselist=False, cascade="all, delete-orphan")
    referee_profile = db.relationship('RefereeProfile', backref='user', uselist=False, cascade="all, delete-orphan")
    coach_profile = db.relationship('CoachProfile', backref='user', uselist=False, cascade="all, delete-orphan")
    posts = db.relationship('Post', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)
    teams = db.relationship('Team', secondary=TeamMembers, backref='members', lazy='dynamic')
    followed_teams = db.relationship('Team', secondary=TeamFollowers, backref='followers', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'nickname': self.nickname,
            'email': self.email,
            'avatarUrl': self.avatarUrl,
            'role': self.role,
            'city': self.city,
            'elo': self.elo
        }


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    logoUrl = db.Column(db.String(200))
    captainId = db.Column(db.Integer, db.ForeignKey('user.id'))
    game = db.Column(db.String(100))
    rank = db.Column(db.Integer, default=1200)
    city = db.Column(db.String(100))

    # Relationships
    posts = db.relationship('Post', backref='team', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'logoUrl': self.logoUrl,
            'captainId': self.captainId,
            'game': self.game,
            'rank': self.rank,
            'city': self.city
        }

class PlayerProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    elo = db.Column(db.Integer, default=1000)
    matchesPlayed = db.Column(db.Integer, default=0)
    wins = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'elo': self.elo,
            'matchesPlayed': self.matchesPlayed,
            'wins': self.wins
        }

class RefereeProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    category = db.Column(db.String(50))
    matchesJudged = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'category': self.category,
            'matchesJudged': self.matchesJudged
        }

class CoachProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    specialization = db.Column(db.String(150))
    experienceYears = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'specialization': self.specialization,
            'experienceYears': self.experienceYears
        }

class Tournament(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    game = db.Column(db.String(100))
    status = db.Column(db.String(50))
    prizePool = db.Column(db.String(100))
    participants = db.Column(db.Integer, default=0)
    maxParticipants = db.Column(db.Integer)
    startDate = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'game': self.game,
            'status': self.status,
            'prizePool': self.prizePool,
            'participants': self.participants,
            'maxParticipants': self.maxParticipants,
            'startDate': self.startDate
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    authorId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    teamId = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=func.now())

    # Relationships
    comments = db.relationship('Comment', backref='post', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'authorId': self.authorId,
            'teamId': self.teamId,
            'content': self.content,
            'timestamp': self.timestamp.isoformat()
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    authorId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'authorId': self.authorId,
            'text': self.text,
            'timestamp': self.timestamp.isoformat()
        }

class Playground(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    address = db.Column(db.String(250))
    type = db.Column(db.String(100))
    surface = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'type': self.type,
            'surface': self.surface
        }

class Quest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    description = db.Column(db.Text)
    type = db.Column(db.String(50))
    xp_reward = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'xp_reward': self.xp_reward
        }

class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    description = db.Column(db.Text)
    icon = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon
        }

class Sponsor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    logoUrl = db.Column(db.String(200))
    contribution = db.Column(db.String(200))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'logoUrl': self.logoUrl,
            'contribution': self.contribution
        }



# --- API Endpoints ---

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the API!'})

@app.route('/api/v1/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/api/v1/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = db.get_or_404(User, user_id)
    return jsonify(user.to_dict())

@app.route('/api/v1/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or not all(k in data for k in ('nickname', 'email', 'role', 'city')):
        return jsonify({'error': 'Missing data'}), 400

    if User.query.filter_by(nickname=data['nickname']).first():
        return jsonify({'error': 'Nickname already exists'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400

    new_user = User(
        nickname=data['nickname'],
        email=data['email'],
        role=data['role'],
        city=data['city']
    )

    role = data.get('role')
    if role == 'player':
        new_user.player_profile = PlayerProfile()
    elif role == 'referee':
        new_user.referee_profile = RefereeProfile()
    elif role == 'coach':
        new_user.coach_profile = CoachProfile()

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201

@app.route('/api/v1/teams', methods=['GET'])
def get_teams():
    teams = Team.query.all()
    return jsonify([team.to_dict() for team in teams])

@app.route('/api/v1/teams/<int:team_id>', methods=['GET'])
def get_team(team_id):
    team = db.get_or_404(Team, team_id)
    return jsonify(team.to_dict())

@app.route('/api/v1/teams', methods=['POST'])
def create_team():
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'captainId', 'game', 'city')):
        return jsonify({'error': 'Missing data'}), 400

    if not db.get_or_404(User, data['captainId']):
        return jsonify({'error': 'Captain user not found'}), 400

    new_team = Team(
        name=data['name'],
        captainId=data['captainId'],
        game=data['game'],
        city=data['city']
    )

    db.session.add(new_team)
    db.session.commit()

    return jsonify(new_team.to_dict()), 201

@app.route('/api/v1/tournaments', methods=['GET'])
def get_tournaments():
    tournaments = Tournament.query.all()
    return jsonify([t.to_dict() for t in tournaments])

@app.route('/api/v1/tournaments/<int:tournament_id>', methods=['GET'])
def get_tournament(tournament_id):
    tournament = db.get_or_404(Tournament, tournament_id)
    return jsonify(tournament.to_dict())

@app.route('/api/v1/tournaments', methods=['POST'])
def create_tournament():
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'game', 'status', 'maxParticipants', 'startDate')):
        return jsonify({'error': 'Missing data'}), 400

    new_tournament = Tournament(
        name=data['name'],
        game=data['game'],
        status=data['status'],
        maxParticipants=data['maxParticipants'],
        startDate=data['startDate']
    )

    db.session.add(new_tournament)
    db.session.commit()

    return jsonify(new_tournament.to_dict()), 201

@app.route('/api/v1/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([p.to_dict() for p in posts])

@app.route('/api/v1/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    if not data or not all(k in data for k in ('authorId', 'content')):
        return jsonify({'error': 'Missing data'}), 400

    if not db.get_or_404(User, data['authorId']):
        return jsonify({'error': 'Author not found'}), 400

    teamId = data.get('teamId')
    if teamId and not db.get_or_404(Team, teamId):
         return jsonify({'error': 'Team not found'}), 400

    new_post = Post(
        authorId=data['authorId'],
        content=data['content'],
        teamId=teamId
    )

    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.to_dict()), 201

@app.route('/api/v1/posts/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    post = db.get_or_404(Post, post_id)
    comments = post.comments
    return jsonify([c.to_dict() for c in comments])

@app.route('/api/v1/posts/<int:post_id>/comments', methods=['POST'])
def create_comment(post_id):
    data = request.get_json()
    if not data or not all(k in data for k in ('authorId', 'text')):
        return jsonify({'error': 'Missing data'}), 400

    if not db.get_or_404(Post, post_id):
        return jsonify({'error': 'Post not found'}), 404

    if not db.get_or_404(User, data['authorId']):
        return jsonify({'error': 'Author not found'}), 400

    new_comment = Comment(
        postId=post_id,
        authorId=data['authorId'],
        text=data['text']
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201

@app.route('/api/v1/playgrounds', methods=['GET'])
def get_playgrounds():
    playgrounds = Playground.query.all()
    return jsonify([p.to_dict() for p in playgrounds])

@app.route('/api/v1/playgrounds', methods=['POST'])
def create_playground():
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'address', 'type', 'surface')):
        return jsonify({'error': 'Missing data'}), 400

    new_playground = Playground(
        name=data['name'],
        address=data['address'],
        type=data['type'],
        surface=data['surface']
    )

    db.session.add(new_playground)
    db.session.commit()

    return jsonify(new_playground.to_dict()), 201

@app.route('/api/v1/quests', methods=['GET'])
def get_quests():
    quests = Quest.query.all()
    return jsonify([q.to_dict() for q in quests])

@app.route('/api/v1/achievements', methods=['GET'])
def get_achievements():
    achievements = Achievement.query.all()
    return jsonify([a.to_dict() for a in achievements])

@app.route('/api/v1/sponsors', methods=['GET'])
def get_sponsors():
    sponsors = Sponsor.query.all()
    return jsonify([s.to_dict() for s in sponsors])

@app.route('/api/v1/sponsors', methods=['POST'])
def create_sponsor():
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'logoUrl', 'contribution')):
        return jsonify({'error': 'Missing data'}), 400

    new_sponsor = Sponsor(
        name=data['name'],
        logoUrl=data['logoUrl'],
        contribution=data['contribution']
    )

    db.session.add(new_sponsor)
    db.session.commit()

    return jsonify(new_sponsor.to_dict()), 201

@app.route('/api/v1/profiles/player', methods=['GET'])
def get_player_profiles():
    profiles = PlayerProfile.query.all()
    return jsonify([p.to_dict() for p in profiles])

@app.route('/api/v1/profiles/referee', methods=['GET'])
def get_referee_profiles():
    profiles = RefereeProfile.query.all()
    return jsonify([p.to_dict() for p in profiles])

@app.route('/api/v1/profiles/coach', methods=['GET'])
def get_coach_profiles():
    profiles = CoachProfile.query.all()
    return jsonify([p.to_dict() for p in profiles])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

    