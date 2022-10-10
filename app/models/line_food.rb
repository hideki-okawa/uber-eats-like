class LineFood < ApplicationRecord
  # 1つのline_food（仮注文）は1つのfoodに属する
  belongs_to :food
  # 1つのline_food（仮注文）は1つのrestaurantに属する
  belongs_to :restaurant
  # 1つのline_food（仮注文）は1つのorderに属する
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }

  # activeメソッドでactiveなline_food（仮注文）を取得する
  scope :active, -> { where(active: true) }
  # other_restaurantメソッドで他の店舗のline_food（仮注文）を取得する
  # 引数としてpicked_restaurant_idを渡す
  scope :other_restaurant, ->(picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  def total_amount
    food.price * count
  end
end
