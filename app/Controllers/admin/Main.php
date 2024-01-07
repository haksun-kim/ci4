<?php 

namespace App\Controllers\Admin;

use App\Controllers\BaseController;

class Main extends BaseController
{
    public function index()
    {
        //echo '/admin/main/index page';
        return view('admin/Main/index_v');
    }
    
}
