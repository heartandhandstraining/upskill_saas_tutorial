class ProfilesController < ApplicationController
  
  # User makes GET to /users/:user_id/profile/new
  def new
    #Render blank profile details form
    @profile = Profile.new
  end
end
