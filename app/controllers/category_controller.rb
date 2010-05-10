class CategoryController < ApplicationController
  layout 'products'
  
  def show
    category = Category.find_by_name(params[:id])
    @products = category.products.all
    @categories = Category.all
    render :template => '/products/index'
  end
end
