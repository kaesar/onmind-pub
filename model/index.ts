export interface Component {
    slug: string;
    title: string;
    description: string;
    type: string;
    repo: string;
}
  
export interface CardProps extends Component {}
  
export interface CardGridProps {
    components: Component[];
}
