Drewaltizer::Application.routes.draw do
  devise_for :customers

  devise_for :users

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
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
        get :list
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
  resources :cart
  
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
