class Admin::ProductsController < ApplicationController
  layout 'admin'
  before_filter :login_required
  
  active_scaffold :product do |config|
    config.label = '商品管理'
    config.columns = [
      :title, :code, :category, :price, :description, :image, :cover_image, :created_at, :updated_at
    ]
    config.columns[:title].label        = '商品名'
    config.columns[:code].label         = '商品コード'
    config.columns[:category].label     = 'カテゴリ'
    config.columns[:price].label        = '価格'
    config.columns[:description].label  = '説明'
    config.columns[:image].label        = '商品写真'
    config.columns[:cover_image].label  = 'カバー画像'
    config.columns[:created_at].label   = '作成日時'
    config.columns[:updated_at].label   = '更新日時'
  end
end
