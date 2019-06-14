class Api::V1::ArtistsController < ApiController
  def index
    raise
    render json: Artist.all, status: :ok
  end
end
