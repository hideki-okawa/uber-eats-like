Rails.application.routes.draw do
  # api/ でグルーピングする
  namespace :api do
    # v1/ でグルーピングする
    namespace :v1 do
      # restaurants の一覧を取得
      resources :restaurants do
        # restaurants内の food の一覧を取得
        resources :foods, only: %i[index]
      end
      # line_foods の一覧を取得、作成
      resources :line_foods, only: %i[index create]
      # PUT line_foods/replace で line_foods#replaceを呼び出す
      put 'line_foods/replace', to: 'line_foods#replace'
      # order の作成
      resources :orders, only: %i[create]
    end
  end
end
