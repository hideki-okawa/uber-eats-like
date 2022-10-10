class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      # t.テーブルのカラム名 :カラム名, オプション..
      t.string :name, null: false
      t.integer :fee, null: false, default: 0
      t.integer :time_required, null: false

      t.timestamps
    end
  end
end
