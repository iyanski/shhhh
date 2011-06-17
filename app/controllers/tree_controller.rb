class TreeController < ApplicationController
  
  def create
    Rails.logger.info(params[:node].inspect)
    if params[:node] == 'src'
      render :json => '[{"id":"1","text":"Events","cls":"folder"},{"id":"2","text":"Users","cls":"folder"},{"id":"3","text":"Distribution","cls":"folder"},{"id":"4","text":"Reports","cls":"folder"},{"id":"5","text":"Promotions","cls":"folder"}]'
    elsif params[:node] == "1"
      render :json => '[{"id":"11","text":"Browser","leaf":true},{"id":"12","text":"Create","leaf":true},{"id":"13","text":"Calendar","leaf":true},{"id":"14","text":"Bookings","leaf":true},{"id":"15","text":"Live Stream","leaf":true}]'
    elsif params[:node] == "2"
      render :json => '[{"id":"23","text":"List","leaf":true},{"id":"24","text":"Media Types","leaf":true}]'
    elsif params[:node] == "3"
      render :json => '[{"id":"32","text":"Users","leaf":true}]'
    elsif params[:node] == "4"
      render :json => '[{"id":"42","text":"Sales Orders","leaf":true},{"id":"43","text":"Ordered Photos","leaf":true},{"id":"44","text":"Synch Processes","leaf":true}]'
    elsif params[:node] == "5"
      render :json => '[{"id":"51","text":"Coupons","leaf":true}]'
    else
      render :layout => false
    end
  end
end