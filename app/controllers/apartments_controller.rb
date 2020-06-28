class ApartmentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :edit, :update, :destroy]

  def index
    apartments = Apartment.all
    render json: apartments
  end

  def show
    apartment = Apartment.find(params[:id])
    render json: apartment
  end

  def new
  end

  def create
    apartment = current_user.apartments.create(apartment_params)
    if apartment.valid?
      render json: apartment
    else
      render json: apartment.errors, status: 422
    end
  end

  def edit
    apartment = current_user.apartments.find(params[:id])
    render json: apartment
  end

  def update
    apartment = current_user.apartments.find(params[:id])
    apartment.update(apartment_params)
    if apartment.valid?
      render json: apartment
    else
      render json: apartment.errors, status: 422
    end
  end

  def destroy
    apartment = current_user.apartments.find(params[:id])
    if apartment.destroy
      render json: apartment
    else
      render json: apartment.errors, status: 422
    end
  end

  private
  def apartment_params
    params.require(:apartment).permit(:street_number, :city, :state, :zip, :country, :building_manager, :phone, :hours, :description, :subject, :image_url, :rent, :bathroom_count, :bedroom_count)
  end
end
