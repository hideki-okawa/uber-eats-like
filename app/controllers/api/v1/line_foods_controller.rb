module Api
  module V1
    class LineFoodsController < ApplicationController
      # create replace処理の前に仮注文を取得する
      before_action :set_food, only: %i[create replace]

      def create
        # すでに別店舗で仮注文されていたら406を返す
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          return render json: {
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name
          }, status: :not_acceptable
        end

        # line_foodインスタンスの生成or更新
        set_line_food(@ordered_food)

        # line_foodをDBに保存する
        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :inernal_server_error
        end
      end

      def index
        # アクティブな仮注文を取得
        line_foods = LineFood.active
        if line_foods.exists?
          render json: {
            # LineFoodのidを配列形式で返す
            line_food_ids: line_foods.map { |line_food| line_food.id },
            # レストラン情報
            restaurant: line_foods[0].restaurant,
            # line_foodインスタンスの数量
            count: line_foods.sum { |line_food| line_food[:count] },
            # line_foodインスタンスの数量×料金
            amount: line_foods.sum { |line_food| line_food.total_amount },
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def replace
        # アクティブな仮注文を非アクティブにする
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
          line_food.update_attribute(:active, false)
        end

        # line_foodインスタンスの生成or更新
        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end
      
      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      end

      # line_foodインスタンスの生成
      def set_line_food(ordered_food)
        # 仮注文インスタンスが存在する場合は既存インスタンスの更新を行う
        # 存在しない場合は新規作成をする
        if ordered_food.line_food.present?
          @line_food = ordered_food.line_food
          @line_food.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
