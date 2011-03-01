class HomeController < ApplicationController
  def about
    @page_title = "About"
  end
  
  def terms
    @page_title = "Terms"
  end
  
  def privacy
    @page_title = "Privacy Policy"
  end
  
  def contact
    @page_title = "Contact Us"
  end
end