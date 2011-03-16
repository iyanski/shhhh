class FavoritesController < ApplicationController
  def index
  end
  
  def create
    @favorite = Favorite.new(params[:favorite])
    @favorite.save!
    redirect_to :back
  end
  
  def destroy
  end
end
