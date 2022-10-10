class Restaurant < ApplicationRecord
  # 1つのrestaurantには複数のfoodがある
  has_many :foods
  # 1つのrestaurantには複数のline_foods（仮注文）がある
  has_many :line_foods, through: :foods

  # name, fee, time_requiredは空ではない
  validates :name, :fee, :time_required, presence: true
  # nameの長さは最大30文字
  validates :name, length: { maximum: 30 }

  # feeは数値のみ、0以上
  validates :fee, numericality: { greater_than: 0 }
end
