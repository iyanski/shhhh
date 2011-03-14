require 'whenever/capistrano'
default_run_options[:pty] = true

set :application, "drewaltizer"
set :repository,  "git@heroku.com:#{application}.git"

set :scm, :mercurial
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
set  :domain, "dev.drew-altizer.com"
role :web, domain                          # Your HTTP server, Apache/etc
role :app, domain                          # This may be the same as your `Web` server
role :db,  domain, :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

set :deploy_to, "/apps/#{application}"
set :user, "git"
set :password, "gitpw2011"
set :deploy_via, :remote_cache
set :runner, user
set :git_shallow_clone, 1


desc "after deployment stuff -- resque"
task :resque_settings do
  config = {
    'production' => "localhost:6969"
  }
  put config.to_yaml, "#{release_path}/config/resque.yml"
end


desc "after deployment stuff -- db"
task :database_settings do
  config = {
    'production' => {
      'host' => 'localhost',
      'adapter' => 'mysql',
      'encoding' => 'utf8',
      'pool' => '5',
      'timeout' => 5000,
      'username' => 'root',
      'password' => 'root',
      'database' => 'root'
    }
  }
  put config.to_yaml, "#{release_path}/config/database.yml"
end

desc "after creating the dirs"
task :set_owner do
  try_sudo("chown -R #{user}.#{user} #{deploy_to}")
end

desc "generate the js!"
task :generate_js do
  run("cd #{release_path} && /usr/bin/env ruby script/extria/generate i --mode production")
end

task :symlink_cache do
  run("mkdir -p #{shared_path}/cache")
  run("ln -s #{shared_path}/cache #{latest_release}/tmp/cache")
end


after "deploy:update", :database_settings
#after "database_settings", :resque_settings
after "deploy:setup", :set_owner
after "database_settings", :generate_js
after "deploy:finalize_update", :symlink_cache

# If you are using Passenger mod_rails uncomment this:
# if you're still using the script/reapear helper you will need
# these http://github.com/rails/irs_process_scripts

namespace :deploy do
  
  #task :clean_old_releases do
    #run("rm -rf #{previous_release}") if previous_release
  #end
  
  namespace :god do
    task :stop do
      on_rollback { }
      run "cd #{current_path} && god && god terminate"
    end
    
    task :start do
      run "cd #{current_path} && god -c config/groupsme.god && sleep 5"
    end
    
    task :stale_watcher do
      run "cd #{current_path} && god load config/kill_stale_resque_worker.god"
    end
  end
  
  namespace :memcached do
    task :start do
      #memcached -vv -d -m 512 -l 127.0.0.1 -p 2010 -P /apps/itropa/current/tmp/pids/memcached.pid
      deploy.memcached.stop
      run "cd #{current_path} &&  memcached -vv -d -m 512 -l 127.0.0.1 -p 2010 -P #{current_path}/tmp/pids/memcached.pid"
    end
    
    task :stop do
      run "cd #{current_path} && if [ -f tmp/pids/memcached.pid ]; then kill -9 `cat tmp/pids/memcached.pid` &> /dev/null && rm tmp/pids/memcached.pid; fi"
    end
    
    task :restart do
      deploy.memcached.stop
      deploy.memcached.start
    end
  end
  
  namespace :phusion do
    task :restart do
      run "cd #{current_path} && > tmp/restart.txt"
    end
    
    task :stop do
      run "cd #{current_path} && rm tmp/restart.txt"
    end
  end
  
  [:resque].each do |app|
    namespace app do
      [:stop, :start, :restart].each do |action|
        task action do
          run("cd #{current_path} && god #{action} #{app}")
        end
      end
    end
  end

  task :start do
    deploy.god.stop
    deploy.god.start
  end
  
  task :stop do
    [:resque, :memcached ].each do |app|
      deploy.send(app).stop
    end
  end
  
  task :restart, :roles => :app, :except => { :no_release => true } do
    deploy.god.stop
    deploy.god.start
    [:resque].each do |app|
      deploy.send(app).restart
    end
    deploy.memcached.restart
    deploy.phusion.restart
  end
  
  task :migrate do
    #raise 'no more remigrate'
    stop
    run("cd #{current_path} && rake groupsme:setup RAILS_ENV=production")
    start
  end
  
  task :remove_pids do
    run "cd #{current_path} && rm tmp/pids/*.pid"
  end
end