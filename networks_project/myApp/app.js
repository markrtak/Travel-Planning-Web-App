var express = require('express');
var path = require('path');
var session = require('express-session');
var app = express();

const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");

// Database and collection variables (will be set after connection)
var db;
var collection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware setup (required for multiple users)
app.use(session({
  secret: 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if using HTTPS
}));

// Middleware to check if user is logged in (protect routes)
function requireLogin(req, res, next) {
  if (req.session.username) {
    next(); // User is logged in, continue to the route
  } else {
    res.redirect('/'); // Not logged in, redirect to login
  }
}

// All destinations data for search functionality
var destinations = [
  { name: 'Inca Trail to Machu Picchu', route: '/inca' },
  { name: 'Annapurna Circuit', route: '/annapurna' },
  { name: 'Paris', route: '/paris' },
  { name: 'Rome', route: '/rome' },
  { name: 'Bali Island', route: '/bali' },
  { name: 'Santorini Island', route: '/santorini' }
];

// ==================== PUBLIC ROUTES ====================

// GET / -> login page
app.get('/', function (req, res) {
  // Pass success message if registration was successful
  var successMsg = req.session.registersuccess || null;
  if (req.session.registersuccess) {
    delete req.session.registersuccess; // Clear after showing once
  }
  res.render('login', { success: successMsg, error: null });
});

app.get('/register', function (req, res) {
  res.render('registration', { error: null });
});

app.post('/register', function (req, res) {
  var username = (req.body.username || '').trim();
  var password = (req.body.password || '').trim();
  
  // Check if fields are empty
  if (!username || !password) {
    return res.render('registration', { error: 'empty fields or username exists' });
  }
  
  // Check if username already exists
  collection.findOne({ username: username }).then(function (existing) {
    if (existing) {
      return res.render('registration', { error: 'empty fields or username exists' });
    }
    
    // Username doesn't exist, insert new user
    collection.insertOne({ 
      username: username, 
      password: password, 
      wanttogolist: [] 
    }).then(function (result) {
      if (result.insertedId) {
        // Registration successful - redirect to login with success message
        req.session.registersuccess = 'Registration successful! Please log in.';
        return res.redirect('/');
      } else {
        return res.render('registration', { error: 'Registration failed. Please try again.' });
      }
    }).catch(function (err) {
      console.error('Registration error:', err);
      return res.render('registration', { error: 'An error occurred. Please try again.' });
    });
  }).catch(function (err) {
    console.error('Database error:', err);
    return res.render('registration', { error: 'Database error. Please try again.' });
  });
});

app.post('/login', function (req, res) {
  var username = (req.body.username || '').trim();
  var password = (req.body.password || '').trim();
  
  if (!username || !password) {
    return res.render('login', { error: 'Please enter username and password.', success: null });
  }
  
  // Check if user exists and password matches
  collection.findOne({ username: username }).then(function (user) {
    if (!user || user.password !== password) {
      return res.render('login', { error: 'Invalid username or password.', success: null });
    }
    
    // Credentials are correct - create session and redirect to home
    req.session.username = username;
    req.session.userId = user._id.toString();
    res.redirect('/home');
  }).catch(function (err) {
    console.error('Login error:', err);
    return res.render('login', { error: 'An error occurred. Please try again.', success: null });
  });
});

// ==================== PROTECTED ROUTES ====================

// Home page
app.get('/home', requireLogin, function (req, res) {
  res.render('home');
});

// Category pages
app.get('/hiking', requireLogin, function (req, res) {
  res.render('hiking');
});

app.get('/cities', requireLogin, function (req, res) {
  res.render('cities');
});

app.get('/islands', requireLogin, function (req, res) {
  res.render('islands');
});

// Destination pages
app.get('/inca', requireLogin, function (req, res) {
  res.render('inca', { error: null, success: null });
});

app.get('/annapurna', requireLogin, function (req, res) {
  res.render('annapurna', { error: null, success: null });
});

app.get('/paris', requireLogin, function (req, res) {
  res.render('paris', { error: null, success: null });
});

app.get('/rome', requireLogin, function (req, res) {
  res.render('rome', { error: null, success: null });
});

app.get('/bali', requireLogin, function (req, res) {
  res.render('bali', { error: null, success: null });
});

app.get('/santorini', requireLogin, function (req, res) {
  res.render('santorini', { error: null, success: null });
});

// Want-to-Go List page
app.get('/wanttogo', requireLogin, function (req, res) {
  collection.findOne({ username: req.session.username }).then(function (user) {
    var wanttogolist = user.wanttogolist || [];
    res.render('wanttogo', { wanttogolist: wanttogolist });
  }).catch(function (err) {
    console.error('Error fetching want-to-go list:', err);
    res.render('wanttogo', { wanttogolist: [] });
  });
});

// Add to Want-to-Go List
app.post('/addtowanttogolist', requireLogin, function (req, res) {
  var destination = req.body.destination;
  var destinationRoute = req.body.route;
  
  collection.findOne({ username: req.session.username }).then(function (user) {
    var wanttogolist = user.wanttogolist || [];
    
    // Check if destination is already in the list
    var alreadyExists = wanttogolist.some(function (item) {
      return item.name === destination;
    });
    
    if (alreadyExists) {
      // Destination already in list - render with error
      return res.render(destinationRoute.substring(1), { 
        error: 'This destination is already in your Want-to-Go List!',
        success: null
      });
    }
    
    // Add destination to list
    wanttogolist.push({ name: destination, route: destinationRoute });
    
    collection.updateOne(
      { username: req.session.username },
      { $set: { wanttogolist: wanttogolist } }
    ).then(function () {
      res.render(destinationRoute.substring(1), { 
        error: null,
        success: 'Added to your Want-to-Go List!'
      });
    }).catch(function (err) {
      console.error('Error updating want-to-go list:', err);
      res.render(destinationRoute.substring(1), { 
        error: 'Error adding to list. Please try again.',
        success: null
      });
    });
  }).catch(function (err) {
    console.error('Error fetching user:', err);
    res.redirect('/home');
  });
});

// Search functionality
app.post('/search', requireLogin, function (req, res) {
  var searchKey = (req.body.Search || '').trim().toLowerCase();
  
  if (!searchKey) {
    return res.render('searchresults', { results: [], notfound: false, searchKey: '' });
  }
  
  // Filter destinations that contain the search key (case-insensitive)
  var results = destinations.filter(function (dest) {
    return dest.name.toLowerCase().includes(searchKey);
  });
  
  if (results.length === 0) {
    res.render('searchresults', { results: [], notfound: true, searchKey: searchKey });
  } else {
    res.render('searchresults', { results: results, notfound: false, searchKey: searchKey });
  }
});

// ==================== START SERVER ====================

// Connect to MongoDB then start server
client.connect().then(function () {
  console.log('Connected to MongoDB');
  db = client.db('myDB');
  collection = db.collection('myCollection');
  
  app.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
  });
}).catch(function (err) {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
