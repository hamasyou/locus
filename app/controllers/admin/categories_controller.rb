class Admin::CategoriesController < ApplicationController
  layout 'admin'
  before_filter :login_required
  
  active_scaffold :category do |config|
    config.label = 'カテゴリ管理'
    config.columns = [ :name, :products ]
    config.columns[:name].label = 'ジャンル名'
    config.columns[:products].label = '商品'
    config.create.columns.exclude :products
    config.update.columns.exclude :products
  end
end
