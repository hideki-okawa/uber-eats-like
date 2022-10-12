module Api
  module V1
    class FoodsController < ApplicationController
      def index
        pp "start foods index"
        restaurant = params[:restaurant_id]
        foods = restaurant.foods

        render json: {
          foods: foods
        }, status: :ok
      end
    end
  end
end
