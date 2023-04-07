<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Http\Requests\StoreBuildingRequest;
use App\Http\Requests\UpdateBuildingRequest;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
//use Spatie\QueryBuilder\QueryBuilder;

class BuildingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
//        return QueryBuilder::for(Building::class)
//            ->allowedFilters(['distance', 'building_class'])
//            ->get();

        $building_class = $request->input('building_class');

        return response()->json([
            'class' => $building_class,
        ]);

//        return DB::table('buildings')
//            ->when($building_class, function (Builder $query, array $building_class) {
//                $query->whereIn('building_class', $building_class);
//            })
//
//            ->get();
    }

    /**
     * Get list of Metro stations near Buildings
     */
    public function getMetro($id)
    {
        return Building::find($id)->metros()->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBuildingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Building $building)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Building $building)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBuildingRequest $request, Building $building)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Building $building)
    {
        //
    }
}
