import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { SegmentService } from '../../services/index';
import { Segment } from '../../dto/index';
import { SegmentsComponent } from '../segments.component';
import { debug } from 'util';
import { Router } from '@angular/router';
import { ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, filter } from 'rxjs/operators';

/** Flat node with expandable and level information */
export class DynamicFlatNode {
    constructor(public id: number, public item: string, public level = 1, public expandable = false,
        public isLoading = false) { }
}

export class DynamicSegmentFlatNode {
    constructor(public segmentId: number, public segmentName: string, public level = 1, public expandable = false,
        public isLoading = false) { }
}

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
    dataMap = new Map<string, string[]>([
        ['Marketing', ['Apple', 'Orange', 'Banana']],
        ['Sales', ['Tomato', 'Potato', 'Onion']],
        ['Manufacturing', ['Fuji', 'Macintosh']],
        ['IT', ['Yellow', 'White', 'Purple']]
    ]);

    segmentDataMap = new Map<any, any[]>([
    ]);

    rootLevelNodes: string[] = ['Marketing', 'Sales', 'Manufacturing', 'IT'];

    getChildren(id: number, node: string): string[] | undefined {

        return this.segmentDataMap.get(id);

        //return this.dataMap.get(node);
    }

    isExpandable(node: string): boolean {
        return this.dataMap.has(node);
    }
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {

    dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

    get data(): DynamicFlatNode[] { return this.dataChange.value; }
    set data(value: DynamicFlatNode[]) {
        this._treeControl.dataNodes = value; ``
        this.dataChange.next(value);
    }

    constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
        private _database: DynamicDatabase) { }

    connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if ((change as SelectionChange<DynamicFlatNode>).added ||
                (change as SelectionChange<DynamicFlatNode>).removed) {
                this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    disconnect(collectionViewer: CollectionViewer): void { }

    handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
        }
    }

    toggleNode(node: DynamicFlatNode, expand: boolean) {
        const children = this._database.getChildren(node.id, node.item);
        const index = this.data.indexOf(node);
        if (!children || index < 0) { // If no children, or cannot find the node, no op
            return;
        }

        node.isLoading = true;

        setTimeout(() => {
            if (expand) {
                const nodes = children.map(name =>
                    new DynamicFlatNode(node.id, name, node.level + 1, this._database.isExpandable(name)));
                this.data.splice(index + 1, 0, ...nodes);
            } else {
                let count = 0;
                for (let i = index + 1; i < this.data.length
                    && this.data[i].level > node.level; i++, count++) { }
                this.data.splice(index + 1, count);
            }

            this.dataChange.next(this.data);
            node.isLoading = false;
        }, 1000);
    }
}

@Injectable({ providedIn: 'root' })
export class DynamicSegmentDatabase {
    dataMap = new Map<string, string[]>([
        ['Marketing', ['Apple', 'Orange', 'Banana']],
        ['Sales', ['Tomato', 'Potato', 'Onion']],
        ['Manufacturing', ['Fuji', 'Macintosh']],
        ['IT', ['Yellow', 'White', 'Purple']]
    ]);

    rootLevelNodes: Array<Segment> = new Array<Segment>();

    /** Initial data from database */
    initialData(segments: Array<Segment>): DynamicSegmentFlatNode[] {
        this.rootLevelNodes = segments;
        return this.rootLevelNodes.map(segment => new DynamicSegmentFlatNode(segment.id, segment.name, 0, true));
    }

    getChildren(node: string): string[] | undefined {
        return this.dataMap.get(node);
    }

    isExpandable(node: string): boolean {
        return this.dataMap.has(node);
    }
}

@Component({
    selector: 'segment-list',
    templateUrl: 'segment-list.component.html',
    styleUrls: ['segment-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class TreeDynamicExample {

    segmentsRoute = 'segments';
    @Input() _segments: Array<Segment> = new Array<Segment>();
    _filteredSegments: Array<Segment> = new Array<Segment>();
    @ViewChild('searchSegment', { static: true }) input: ElementRef;

    constructor(private router: Router, private segmentService: SegmentService, private database: DynamicDatabase, private segmentDatabase: DynamicSegmentDatabase) {
        this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new DynamicDataSource(this.treeControl, database);
        this.dataSource.data = [];
        this.setSegmentsDataSource();
    }

    ngAfterViewInit() {
        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(200),
                distinctUntilChanged(),
                tap((text: KeyboardEvent) => {
                    let searchTerm = (text.target as HTMLInputElement).value;
                    this.filterSegments(searchTerm);
                    console.log("calling search");
                })
            )
            .subscribe();
    }

    ngOnInit() {
        this.setSegmentsDataSource();
    }

    @Input() set segments(value: Array<Segment>) {
        this._segments = value;
    }

    get segments() {
        return this._segments;
    }

    ngOnChanges() {
        this.setSegmentsDataSource();
    }

    async setSegmentsDataSource(): Promise<boolean> {

        return Promise.resolve((async () => {

            let segments = (this._filteredSegments && this._filteredSegments.length > 0) ? this._filteredSegments : this.segments;

            this.dataSource.data = segments.map(s => new DynamicFlatNode(s.id, s.name, 0, s.models.length > 0, false));
            let modelMaps = new Map<number, string[]>();
            segments.forEach((s) => {
                modelMaps.set(s.id, s.models.map(m => m.name));
            });
            this.database.segmentDataMap = modelMaps;
            return true;
        })());
    }

    async setSegments(): Promise<boolean> {
        return Promise.resolve((async () => {
            let segmentsFetched = this.segmentService.getSegments();
            let segments = await segmentsFetched.toPromise();
            this.segments = segments;

            this.dataSource.data

            return true;
        })());
    }

    showSegment(segment) {
        return this.router.navigateByUrl(this.segmentsRoute + "/" + segment.id);
    }

    treeControl: FlatTreeControl<DynamicFlatNode>;

    dataSource: DynamicDataSource;

    getLevel = (node: DynamicFlatNode) => node.level;

    isExpandable = (node: DynamicFlatNode) => node.expandable;

    hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

    async filterSegments(searchTerm) {
        if (searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            this._filteredSegments = this._segments.filter(
                f => (f.name.toLowerCase().indexOf(searchTerm) >= 0 || f.models.find(m => m.name.toLowerCase().indexOf(searchTerm) >= 0) != null)
            );
        } else {
            this._filteredSegments = this._segments;
        }

        await this.setFilteredSegmentsDataSource();
    }

    async setFilteredSegmentsDataSource(): Promise<boolean> {

        return Promise.resolve((async () => {

            let segments = this._filteredSegments;

            this.dataSource.data = segments.map(s => new DynamicFlatNode(s.id, s.name, 0, s.models.length > 0, false));
            let modelMaps = new Map<number, string[]>();
            segments.forEach((s) => {
                modelMaps.set(s.id, s.models.map(m => m.name));
            });
            this.database.segmentDataMap = modelMaps;
            return true;
        })());
    }

}