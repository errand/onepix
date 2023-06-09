<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Http\Requests\StoreBuildingRequest;
use App\Http\Requests\UpdateBuildingRequest;
use Carbon\Carbon;
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

        $deadline = $request->input('deadline');
        $building_class = $request->input('building_class');
        $yard = $request->input('yard');
        $finishing = $request->input('finishing');
        $parking = $request->input('parking');
        $constructive = $request->input('constructive');
        $river = $request->input('river');
        $forest = $request->input('forest');
        $sale = $request->input('sale');
        $without_cars = $request->input('without_cars');
        $ceiling = $request->input('ceiling');
        $pantries = $request->input('pantries');
        $windows = $request->input('windows');
        $low_rise = $request->input('low_rise');

        return DB::table('buildings')
            ->when($building_class, function (Builder $query, array $building_class) {
                $query->whereIn('building_class', $building_class);
            })
            ->when($deadline, function (Builder $query, string $deadline) {
                switch ($deadline) {
                    case 'Любой':
                        $query->whereNotNull('deadline');
                        break;
                    case 'Сдан':
                        $query->where('deadline', '<', Carbon::now());
                        break;
                    case 'Этот':
                        $query->whereBetween('deadline', [
                            Carbon::now(),
                            Carbon::now()->endOfYear(),
                        ]);
                        break;
                    case 'Следующий':
                        $query->whereYear('deadline', '>', date('Y'));
                        break;
                }
            })
            ->when($yard, function (Builder $query, string $yard) {
                $query->where('yard', 1);
            })
            ->when($finishing, function (Builder $query, string $finishing) {
                $query->where('finishing', 1);
            })
            ->when($parking, function (Builder $query, string $parking) {
                $query->where('parking', 1);
            })
            ->when($constructive, function (Builder $query, array $constructive) {
                $query->whereIn('constructive', $constructive);
            })
            ->when($river, function (Builder $query, string $river) {
                $query->where('river', 1);
            })
            ->when($forest, function (Builder $query, string $forest) {
                $query->where('forest', 1);
            })
            ->when($sale, function (Builder $query, string $sale) {
                $query->where('sale', 1);
            })
            ->when($without_cars, function (Builder $query, string $without_cars) {
                $query->where('without_cars', 1);
            })
            ->when($ceiling, function (Builder $query, string $ceiling) {
                $query->where('ceiling', '>', 2.7);
            })
            ->when($pantries, function (Builder $query, string $pantries) {
                $query->where('pantries', 1);
            })
            ->when($windows, function (Builder $query, string $windows) {
                $query->where('windows', 1);
            })
            ->when($low_rise, function (Builder $query, string $low_rise) {
                $query->where('floors', '<', 10);
            })

            ->get();
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
