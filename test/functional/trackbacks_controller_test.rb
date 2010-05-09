require 'test_helper'

class TrackbacksControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:trackbacks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create trackback" do
    assert_difference('Trackback.count') do
      post :create, :trackback => { }
    end

    assert_redirected_to trackback_path(assigns(:trackback))
  end

  test "should show trackback" do
    get :show, :id => trackbacks(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => trackbacks(:one).to_param
    assert_response :success
  end

  test "should update trackback" do
    put :update, :id => trackbacks(:one).to_param, :trackback => { }
    assert_redirected_to trackback_path(assigns(:trackback))
  end

  test "should destroy trackback" do
    assert_difference('Trackback.count', -1) do
      delete :destroy, :id => trackbacks(:one).to_param
    end

    assert_redirected_to trackbacks_path
  end
end
