<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseApiController extends Controller
{
    //
   
    private $response = [];

    protected function withSuccess($message='',$data=[]){
      $this->response['message'] = $message;
      $this->response['data'] = $data;
      $this->response['error'] = false;
      return $this->getResponse();
    }

    protected function withError($message='',$data=[]){
        $this->response['message'] = $message;
        $this->response['data'] = $data;
        $this->response['error'] = true;  
        return $this->getResponse();
    }

    private function getResponse(){
        return $this->response;
    }

}
