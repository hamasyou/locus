# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_locus_session',
  :secret      => '36250502979a9583a43c9d35e3a516db28231f911bbd631c489bd0a3247ddb4127543dcfefe779704e3efedea0f2bb34f9770d8556a6a1143edcaea0bd192d99'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
