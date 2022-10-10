class Food < ApplicationRecord
  # 1つのfoodは1つのrestaurantに属している
  belongs_to :restaurant
  # 1つのfoodは1つのorderに属している
  belongs_to :order, optional: true
  # 1つのfoodには1つのline_food（仮注文）がある
  has_one :line_food
end
