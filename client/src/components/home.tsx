import { useMemo, useState } from "react";
import type React from "react";
import { BookOpen, Users, Star, Search, GraduationCap, Target, TrendingUp } from "lucide-react";
import axios from "axios";
import CourseCard from './courseCard';

interface Course {
  course_title: string;
  course_rating: number;
  course_description: string;
  course_organization: string;
  course_time: string;
  course_skills: string[] | string;
  course_url: string;
}

export default function CourseRecommendationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const fetchApi = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/recommend', 
        { text: searchQuery 

        }, 
        {
        headers: { "Content-Type": "application/json" }
        }
    );
      setCourses(response.data);
    } catch (error) {
      console.log('Error fetch recommendation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSearch = () => {
    document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayedCourses = useMemo(() => {
    return courses.filter(course => course.course_rating >= minRating);
  }, [courses, minRating]);

  return (
    <div className="min-h-screen bg-background">
      {/*(Hero dan Benefits Section)*/}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted/50">
        <div className="absolute inset-0 bg-[url('/diverse-students-learning-together-in-modern-class.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex items-center flex-col">
          <div className="mb-8 ">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              RECourse
              <span className="text-accent block">Discover Your Next <br /> Learning Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Get personalized course recommendations powered by AI to accelerate your learning journey and achieve your goals
            </p>
          </div>
          <button
            onClick={scrollToSearch}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
            > 
            Get Started
            <BookOpen className="ml-2 w-5 h-5" />
        </button>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Why Choose Our Recommendation System?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our AI-powered platform analyzes your interests and learning style to suggest the perfect courses for your goals and career aspirations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group hover:shadow-lg transition-all duration-300 border-2 rounded-xl p-6 hover:border-accent/20 hover:-translate-y-1">
              <div className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold">Personalized Recommendations</h3>
              </div>
              <p className="text-center text-base leading-relaxed text-muted-foreground">
                Our AI analyzes your learning preferences, skill level, and career goals to suggest courses tailored specifically for your success.
              </p>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 border-2 rounded-xl p-6 hover:border-accent/20 hover:-translate-y-1">
              <div className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold">Expert <br /> Instructors</h3>
              </div>
                <p className="text-center text-base leading-relaxed text-muted-foreground">
                  Learn from industry professionals and academic experts who bring real-world experience and cutting-edge knowledge to every lesson.
                </p>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 border-2 rounded-xl p-6 hover:border-accent/20 hover:-translate-y-1">
              <div className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold">Career <br /> Growth</h3>
              </div>
                <p className="text-center text-base leading-relaxed text-muted-foreground">
                  Advance your career with courses designed to build in-demand skills and help you achieve your professional objectives.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Find Your Perfect Course</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Enter a topic, skill, or subject you're interested in learning and discover courses tailored to your needs
            </p>
          </div>

          <form onSubmit={fetchApi} className="mb-8">
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  required
                  value={searchQuery}
                  placeholder="e.g., Python, Data Science, Web Development..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 text-lg rounded-xl border-2 focus:border-accent transition-colors text-left"
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="px-4 py-3 text-lg font-semibold rounded-xl bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:bg-muted disabled:cursor-not-allowed"
              >
                {isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <Search />}
              </button>
            </div>
          </form>

          {/* Filter Section*/}
          {courses.length > 0 && (
            <div className="max-w-md mx-auto mb-12 p-4 border rounded-lg">
              <label htmlFor="rating-slider" className="block text-lg font-semibold text-center mb-2">
                Minimum Rating: <span className="font-bold text-accent">{minRating.toFixed(1)}</span>
              </label>
              <input 
                id="rating-slider"
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="text-lg text-muted-foreground mt-4">Finding recommendations...</p>
            </div>
          ) : displayedCourses.length > 0 ? (
            <div className="animate-in fade-in duration-500">
              <h3 className="text-2xl font-bold text-center mb-8">
                Recommended Courses for "{searchQuery}"
                <span className="block text-lg font-normal text-muted-foreground mt-2">
                  {displayedCourses.length} course{displayedCourses.length !== 1 ? "s" : ""} found
                </span>
              </h3>

              {displayedCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">No courses match the minimum rating of {minRating.toFixed(1)}.</p>
              <p className="text-sm text-muted-foreground">Try adjusting the filter slider.</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">Start your learning journey by searching for a topic above</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}