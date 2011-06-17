Drewaltizer::Application.routes.draw do
  devise_for :customers

  devise_for :users
  
  namespace :api do
    resources :albums do
      collection do
        post :list
      end
      member do
        get :list
        post :list
      end
    end
    resources :events do
      collection do
        get :folders
        post :list
        get :buckets
        post :buckets
        post :synchronize
        post :watermark
      end
    end
    
    resources :users do
      collection do
        get :list
        post :list
      end
    end
    
    resources :session do
      collection do
        get :info
      end
    end
  end
  resources :events
  resources :favorites
  resources :photos
  resources :cart do
    collection do
      post 'remove_item'
      post 'add_item'
      post 'change_paper_type'
      post 'change_paper_size'
      post 'duplicate_item'
      post 'change_quantity'
    end
  end
  
  resources :tree
  
  match "cart/add_item/:id", :controller => "cart", :action => "add_item"
  match "cart/remove_item/:id", :controller => "cart", :action => "remove_item"
  match "cart/duplicate_item/:id", :controller => "cart", :action => "duplicate_item"
  match "cart/change_quantity/:id", :controller => "cart", :action => "duplicate_item"
  
  match "photos/thumb0/:id", :controller => "photos", :action => "thumb0"
  match "photos/thumb1/:id", :controller => "photos", :action => "thumb1"
  match "photos/thumb2/:id", :controller => "photos", :action => "thumb2"
  match "photos/download/:id", :controller => "photos", :action => "download"
  match "/levis", :controller => "albums", :action => "show", :id => 1
  
  resources :albums
  resources :archives
  resources :videos
  resources :home do
    collection do
      get 'about'
      get 'contact'
      get 'terms'
      get 'privacy'
    end
  end
  root :to => "events#index"
  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
