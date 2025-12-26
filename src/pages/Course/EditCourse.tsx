import {Button} from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CourseEditSchema, type TCourse} from './type';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';

import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {getErrorMessage} from '@/utils/getErrorMessage';
import DeleteCourse from './DeleteCourse';
import {Checkbox} from '@/components/ui/checkbox';
import {useUpdateCourseMutation} from '@/features/courses/coursesApi';
import type z from 'zod';
import {FileUploadDirectUploadDemo} from '@/components/common/FileUploadDirectUploadDemo copy';

function EditCourse({
  item,
  trigger,
}: {
  item: TCourse;
  trigger: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const [updateCourse, {isLoading}] = useUpdateCourseMutation();
  const form = useForm<z.infer<typeof CourseEditSchema>>({
    resolver: zodResolver(CourseEditSchema),
    defaultValues: {
      ...item,
      title: item.title || '',
      description: item.description || '',
      shortDescription: item.shortDescription || '',
      thumbnailUrl: item.thumbnailUrl || '',
      difficultyLevel: item.difficultyLevel || 'beginner',
      hasFinalQuiz: item.hasFinalQuiz || false,
      passPercentage: Number(item.passPercentage) || 0,
      hasCertificate: item.hasCertificate || true,
      isPublished: item.isPublished || false,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        ...item,
        title: item.title || '',
        description: item.description || '',
        shortDescription: item.shortDescription || '',
        thumbnailUrl: item.thumbnailUrl || '',
        difficultyLevel: item.difficultyLevel || 'beginner',
        hasFinalQuiz: item.hasFinalQuiz || false,
        passPercentage: Number(item.passPercentage) || 0,
        hasCertificate: item.hasCertificate || true,
        isPublished: item.isPublished || false,
      });
    }
  }, [open, item, form]);

  const onSubmit = async (data: z.infer<typeof CourseEditSchema>) => {
    try {
      const res = await updateCourse({id: item.id, data}).unwrap();
      setOpen(false);
      toast.success(res.message || 'Course updated successfully');
      form.reset(res.data);
    } catch (error) {
      console.error('Failed to update course:', error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteSuccess = (message?: string) => {
    console.log('Delete success:', message);
    setOpen(false);
  };

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={open}
      onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <div className="flex items-center justify-between">
            <DrawerTitle>{item.title}</DrawerTitle>
            <DeleteCourse
              id={item.id}
              onSuccess={() => handleDeleteSuccess(item.id)}
            />
          </div>
          <DrawerDescription>Edit course details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Short Description */}
              <FormField
                control={form.control}
                name="shortDescription"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief course overview..."
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed course description..."
                        {...field}
                        value={field.value || ''}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Difficulty Level */}
              <FormField
                control={form.control}
                name="difficultyLevel"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pass Percentage */}
              <FormField
                control={form.control}
                name="passPercentage"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Pass Percentage</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="70" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail URL */}
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/thumbnail.png"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FileUploadDirectUploadDemo
                onUploaded={(url) => {
                  form.setValue('thumbnailUrl', url);
                  toast.success('Thumbnail uploaded successfully!');
                }}
              />

              {/* Boolean Fields */}
              <div className="space-y-4">
                {/* <FormField
                                    control={form.control}
                                    name="hasFinalQuiz"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="!mt-0">Has Final Quiz</FormLabel>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="hasCertificate"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="!mt-0">Has Certificate</FormLabel>
                                        </FormItem>
                                    )}
                                /> */}

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({field}) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Is Published</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <DrawerFooter>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}>
            {isLoading ? 'Saving...' : 'Submit'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditCourse;
